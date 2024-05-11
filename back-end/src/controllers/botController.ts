import { randomUUID } from 'node:crypto';

import axios from 'axios';
import { phone as validatePhone } from 'phone';
import type Telegraf from 'telegraf-ts';
import {
  type Chat,
  Extra,
  type Message,
  type TelegrafContext,
} from 'telegraf-ts';

import { gemini, models, storage } from '../infra/';
import { donationStatus, logger } from '../utils';

const { UserModel, DonationModel } = models;

class BotController {
  static async start(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update?.message?.chat ||
      ctx.update?.callback_query?.message?.chat) as Chat;

    try {
      const userData = {
        chatId: chat.id,
        name: chat.first_name as string,
        username: chat.username as string,
      };

      const user = await UserModel.findOne({
        chatId: userData.chatId,
      });

      if (!user) {
        await UserModel.create(userData);

        logger.info({
          msg: 'Usuário cadastrado com sucesso.',
          user: userData,
        });
      }

      const buttons = [
        [{ text: 'ACEITO', callback_data: 'acceptedTerms' }],
        [{ text: 'NÃO ACEITO', callback_data: 'rejectedTerms' }],
      ];

      return ctx.replyWithMarkdown(
        `Bem-vindo ao *Estou Doando*, ${userData.name}. Aceita os termos de uso?`,
        {
          reply_markup: {
            inline_keyboard: buttons,
          },
          disable_web_page_preview: true,
        },
      );
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        chatId: chat.id,
      });

      return ctx.replyWithMarkdown(
        'Ocorreu um erro inesperado, aguarde alguns minutos e tente novamente.',
      );
    }
  }

  static async message(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const message = ctx.update.message?.text?.trim() as string;

      let user = await UserModel.findOne({
        chatId: chat.id,
      });

      if (!user) {
        const userData = {
          chatId: chat.id,
          name: chat.first_name as string,
          username: chat.username as string,
        };

        user = await UserModel.create(userData);

        logger.info({
          msg: 'Usuário cadastrado com sucesso.',
          user: userData,
        });
      }

      if (!user?.eula) {
        const buttons = [
          [{ text: 'ACEITO', callback_data: 'acceptedTerms' }],
          [{ text: 'NÃO ACEITO', callback_data: 'rejectedTerms' }],
        ];

        return ctx.replyWithMarkdown(
          `Bem-vindo ao *Estou Doando*, ${user?.name}. Aceita os termos de uso?`,
          {
            reply_markup: {
              inline_keyboard: buttons,
            },
            disable_web_page_preview: true,
          },
        );
      }

      if (!user?.address?.zipCode) {
        let response;

        try {
          const zipCode = message.replace(/-/g, '');
          response = await axios.get(
            `https://viacep.com.br/ws/${zipCode}/json/`,
          );
        } catch (error) {
          await ctx.replyWithMarkdown(`*${message}* não é um CEP válido.`);
          return ctx.replyWithMarkdown('Digite seu CEP (somente números): ');
        }

        const address = {
          zipCode: response.data.cep?.replace(/-/g, ''),
          city: response.data.localidade,
          uf: response.data.uf,
        };

        await UserModel.updateOne(
          {
            chatId: chat.id,
          },
          {
            $set: {
              address,
            },
          },
        );

        logger.info({
          msg: 'CEP cadastrado com sucesso.',
          chatId: chat.id,
          address,
        });

        await ctx.replyWithMarkdown(
          `CEP cadastrado com sucesso:\n*${address.city}-${address.uf}* (${address.zipCode})`,
        );

        if (!user?.phone) {
          return ctx.replyWithMarkdown(
            'Digite seu telefone com DDD (somente números): ',
          );
        }
      }

      if (!user?.phone) {
        const phone = validatePhone(message, { country: 'BRA' });

        if (!phone.isValid) {
          await ctx.replyWithMarkdown(`*${message}* não é um telefone válido.`);
          return ctx.replyWithMarkdown(
            'Digite seu telefone com DDD (somente números): ',
          );
        }

        await UserModel.updateOne(
          {
            chatId: chat.id,
          },
          {
            $set: {
              phone: phone.phoneNumber,
            },
          },
        );

        logger.info({
          msg: 'Telefone cadastrado com sucesso.',
          chatId: chat.id,
          phone: phone.phoneNumber,
        });

        await ctx.replyWithMarkdown(
          `Telefone cadastrado com sucesso:\n*${phone.phoneNumber}*`,
        );
      }

      const buttons = [
        [{ text: 'CADASTRAR DOAÇÃO', callback_data: 'createDonation' }],
        [{ text: 'MINHAS DOAÇÕES', callback_data: 'listDonations' }],
      ];

      return ctx.replyWithMarkdown('Escolha uma opção:', {
        reply_markup: {
          inline_keyboard: buttons,
        },
      });
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        chatId: chat.id,
      });

      return ctx.replyWithMarkdown(
        'Ocorreu um erro inesperado, aguarde alguns minutos e tente novamente.',
      );
    }
  }

  static async photo(
    ctx: TelegrafContext,
    bot: Telegraf<TelegrafContext>,
  ): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const user = await UserModel.findOne({
        chatId: chat.id,
      });

      if (!user?.eula) {
        const buttons = [
          [{ text: 'ACEITO', callback_data: 'acceptedTerms' }],
          [{ text: 'NÃO ACEITO', callback_data: 'rejectedTerms' }],
        ];

        return ctx.replyWithMarkdown(
          `Bem-vindo ao *Estou Doando*, ${user?.name}. Aceita os termos de uso?`,
          {
            reply_markup: {
              inline_keyboard: buttons,
            },
            disable_web_page_preview: true,
          },
        );
      }

      const photoUrl = await bot.telegram.getFileLink(
        ctx.update.message?.photo?.pop()?.file_id as string,
      );

      const photoCaption = ctx.update.message?.caption;

      await ctx.replyWithMarkdown('Processando doação, aguarde...');

      const axiosResponse = await axios.get(photoUrl, {
        responseType: 'arraybuffer',
      });

      logger.info({
        message: 'Realizado o download da imagem enviada pelo telegram.',
      });

      const imageBuffer: Buffer = axiosResponse.data;

      const itemsDescription =
        photoCaption || (await gemini.getImageClothingItems(imageBuffer));

      if (!itemsDescription) {
        return ctx.replyWithMarkdown(
          'Não foram identificados itens de vestuário na imagem. Por favor, tente novamente.',
        );
      }

      const imagePath = `images/${randomUUID()}.jpeg`;
      const imageURL = await storage.uploadFile(imagePath, imageBuffer);

      const donation = await DonationModel.create({
        user: user._id,
        chatId: user.chatId,
        description: itemsDescription,
        phone: user.phone,
        imageUrl: imageURL,
        address: user.address,
        status: donationStatus.AGUARDANDO_CONFIRMACAO,
      });

      const confirmDonationButton = Extra.markup((m: any) =>
        m.inlineKeyboard([
          [
            m.callbackButton(
              'CONFIRMAR',
              `confirmDonation_${donation._id?.toString()}`,
            ),
          ],
          [
            m.callbackButton(
              'CANCELAR',
              `cancelDonation_${donation._id?.toString()}`,
            ),
          ],
        ]),
      );

      return ctx.replyWithMarkdown(
        `Confirma o cadastro da seguinte doação:\n\n*${itemsDescription}*`,
        confirmDonationButton,
      );
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        chatId: chat.id,
      });

      return ctx.replyWithMarkdown(
        'Ocorreu um erro inesperado, aguarde alguns minutos e tente novamente.',
      );
    }
  }

  static async showMenuButtons(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const buttons = [
        [{ text: 'CADASTRAR DOAÇÃO', callback_data: 'createDonation' }],
        [{ text: 'MINHAS DOAÇÕES', callback_data: 'listDonations' }],
      ];

      return ctx.replyWithMarkdown('Escolha uma opção:', {
        reply_markup: {
          inline_keyboard: buttons,
        },
      });
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        chatId: chat.id,
      });

      return ctx.replyWithMarkdown(
        'Ocorreu um erro inesperado, aguarde alguns minutos e tente novamente.',
      );
    }
  }
}

export { BotController };
