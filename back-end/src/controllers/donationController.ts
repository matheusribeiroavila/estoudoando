import {
  type Chat,
  Extra,
  type Message,
  type TelegrafContext,
} from 'telegraf-ts';

import { models, redis } from '../infra';
import { donationStatus, logger } from '../utils';

const { DonationModel } = models;

class DonationController {
  static async createDonation(ctx: TelegrafContext): Promise<Message> {
    return ctx.replyWithMarkdown(
      'Siga as instruções abaixo para cadastrar uma doação:\n\n1. Envie uma foto com os itens que serão doados.\n2. A Inteligência Artificial identificará os itens de vestuário automaticamente.\n3. Confirme a doação.\n\nObs: Para identificar os itens por conta própria, escreva uma descrição na foto enviada.',
    );
  }

  static async confirmDonation(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donationId = ctx.callbackQuery?.data?.split('_')?.pop() as string;

      await DonationModel.updateOne(
        {
          _id: donationId,
        },
        {
          $set: {
            status: donationStatus.DISPONIVEL,
          },
        },
      );

      logger.info({
        message: 'Cadastro de doação confirmada',
        donationId,
      });

      await redis.client.incr('donationsAvailable');

      await ctx.replyWithMarkdown('Cadastro de doação confirmada.');

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

  static async cancelDonation(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donationId = ctx.callbackQuery?.data?.split('_')?.pop() as string;

      await DonationModel.updateOne(
        {
          _id: donationId,
        },
        {
          $set: {
            status: donationStatus.INDISPONIVEL,
          },
        },
      );

      logger.info({
        message: 'Cadastro de doação cancelado.',
        donationId,
      });

      await ctx.replyWithMarkdown('Doação cancelado.');

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

  static async listDonations(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donations = await DonationModel.find({
        chatId: chat.id,
        status: donationStatus.DISPONIVEL,
      });

      if (!donations.length) {
        await ctx.replyWithMarkdown('Nenhuma doação cadastrada.');

        const buttons = [
          [{ text: 'CADASTRAR DOAÇÃO', callback_data: 'createDonation' }],
          [{ text: 'MINHAS DOAÇÕES', callback_data: 'listDonations' }],
        ];

        return ctx.replyWithMarkdown('Escolha uma opção:', {
          reply_markup: {
            inline_keyboard: buttons,
          },
        });
      }

      const donationsButtons = Extra.markup((m: any) => {
        const itemsButtons = donations.map((donation) => [
          m.callbackButton(
            donation.description,
            `getDonation_${donation._id?.toString()}`,
          ),
        ]);

        const buttons = [
          ...itemsButtons,
          [m.callbackButton('CANCELAR', `showMenuButtons`)],
        ];

        return m.inlineKeyboard(buttons);
      });

      return ctx.replyWithMarkdown('Escolha uma doação:', donationsButtons);
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

  static async getDonationOptions(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donationId = ctx.callbackQuery?.data?.split('_')?.pop() as string;

      const donation = await DonationModel.findOne({
        _id: donationId,
      });

      const donationButtons = Extra.markup((m: any) => {
        const buttons = [
          [
            m.callbackButton(
              'CONFIRMAR COLETA',
              `confirmDonationCollect_${donation?._id?.toString()}`,
            ),
          ],
          [
            m.callbackButton(
              'EXCLUIR DOAÇÃO',
              `deleteDonation_${donation?._id?.toString()}`,
            ),
          ],
          [m.callbackButton('CANCELAR', `showMenuButtons`)],
        ];

        return m.inlineKeyboard(buttons);
      });

      await ctx.replyWithPhoto({
        url: donation?.imageUrl as string,
        filename: 'doacao.jpeg',
      });

      return ctx.replyWithMarkdown(
        `Escolha uma opção:\n\n*${donation?.description}*`,
        donationButtons,
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

  static async confirmDonationCollect(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donationId = ctx.callbackQuery?.data?.split('_')?.pop() as string;

      await DonationModel.updateOne(
        {
          _id: donationId,
        },
        {
          $set: {
            status: donationStatus.COLETADO,
          },
        },
      );

      await redis.client.decr('donationsAvailable');
      await redis.client.incr('donationsCollected');

      logger.info({
        message: 'Coleta de doação confirmada.',
        donationId,
      });

      await ctx.replyWithMarkdown('Coleta de doação confirmada.');

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

  static async deleteDonation(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const donationId = ctx.callbackQuery?.data?.split('_')?.pop() as string;

      await DonationModel.updateOne(
        {
          _id: donationId,
        },
        {
          $set: {
            status: donationStatus.INDISPONIVEL,
          },
        },
      );

      await redis.client.decr('donationsAvailable');

      logger.info({
        message: 'Doação excluída pelo usuário atualizada para indisponível.',
        donationId,
      });

      await ctx.replyWithMarkdown('Doação excluída.');

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

export { DonationController };
