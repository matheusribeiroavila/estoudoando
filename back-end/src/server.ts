import cors from 'cors';
import express from 'express';
import { Telegraf } from 'telegraf-ts';

import { routes } from './api';
import { env } from './config';
import {
  BotController,
  DonationController,
  UserController,
} from './controllers';
import { Firebase, mongodb, redis } from './infra';
import { logger } from './utils';

const apiStart = async (): Promise<void> => {
  const app = express();

  app.use(
    cors({
      origin: '*',
    }),
  );

  app.use(express.json());

  app.use('/', routes);

  app.get('/hc', (_, res) =>
    res.send({
      message: 'ok',
    }),
  );

  app.use((_, res) =>
    res.status(400).send({
      error: {
        message: 'Rota não implementada.',
      },
    }),
  );

  app.listen(env.PORT, () => {
    logger.info({ message: `Servidor rodando na porta ${env.PORT}.` });
  });
};

const botStart = async (): Promise<void> => {
  const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

  // BotController
  bot.start(async (ctx) => BotController.start(ctx));
  bot.on('text', async (ctx) => BotController.message(ctx));
  bot.on('photo', async (ctx) => BotController.photo(ctx, bot));
  bot.action('start', async (ctx) => BotController.start(ctx));
  bot.action('showMenuButtons', async (ctx) =>
    BotController.showMenuButtons(ctx),
  );

  // UserController
  bot.action('acceptedTerms', async (ctx) => UserController.acceptedTerms(ctx));
  bot.action('rejectedTerms', async (ctx) => UserController.rejectedTerms(ctx));

  // DonationController
  bot.action('createDonation', async (ctx) =>
    DonationController.createDonation(ctx),
  );
  bot.action('listDonations', async (ctx) =>
    DonationController.listDonations(ctx),
  );
  bot.action(/confirmDonation_/, async (ctx) =>
    DonationController.confirmDonation(ctx),
  );
  bot.action(/cancelDonation_/, async (ctx) =>
    DonationController.cancelDonation(ctx),
  );
  bot.action(/getDonation_/, async (ctx) =>
    DonationController.getDonationOptions(ctx),
  );
  bot.action(/confirmDonationCollect_/, async (ctx) =>
    DonationController.confirmDonationCollect(ctx),
  );
  bot.action(/deleteDonation_/, async (ctx) =>
    DonationController.deleteDonation(ctx),
  );

  await bot.launch();
};

const start = async (): Promise<void> => {
  Firebase.connect();
  await mongodb.connect();
  await redis.connect();

  await apiStart();
  await botStart();
};

start().catch((error: any) => {
  logger.error({
    msg: 'Erro ao rodar a aplicação.',
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
});
