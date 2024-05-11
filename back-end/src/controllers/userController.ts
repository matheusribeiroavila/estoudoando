import { type Chat, type Message, type TelegrafContext } from 'telegraf-ts';

import { models } from '../infra';
import { logger } from '../utils';

const { UserModel } = models;

class UserController {
  static async acceptedTerms(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const user = await UserModel.findOne({
        chatId: chat.id,
      });

      if (!user?.eula) {
        await UserModel.updateOne(
          {
            chatId: chat.id,
          },
          {
            $set: {
              eula: true,
            },
          },
        );

        logger.info({
          message: 'Termos aceitos pelo usuário.',
          chatId: chat.id,
        });
      }

      if (!user?.address?.zipCode) {
        return ctx.replyWithMarkdown('Digite seu CEP (somente números): ');
      }

      if (!user?.phone) {
        return ctx.replyWithMarkdown(
          'Digite seu telefone com DDD (somente números): ',
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

  static async rejectedTerms(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat;

    try {
      const user = await UserModel.findOne({
        chatId: chat.id,
      });

      if (user?.eula) {
        await UserModel.updateOne(
          {
            chatId: chat.id,
          },
          {
            $set: {
              eula: false,
            },
          },
        );

        logger.info({
          message: 'Termos rejeitados pelo usuário.',
          chatId: chat.id,
        });
      }

      const buttons = [[{ text: 'INICIAR', callback_data: 'start' }]];

      return ctx.replyWithMarkdown(
        `Estarei aqui para facilitar a sua doação quando quiser, ${chat.first_name}`,
        {
          reply_markup: {
            inline_keyboard: buttons,
          },
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
}

export { UserController };
