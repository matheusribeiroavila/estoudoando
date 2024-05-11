import { type Request, type Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { redis } from '../../infra';
import { DonationModel } from '../../infra/database/models';
import { donationStatus, logger } from '../../utils';

interface donationConditions {
  _id?: object;
  'address.zipCode'?: string;
  status: string;
}

class DonationController {
  static async getDonations(req: Request, res: Response): Promise<Response> {
    try {
      const lastElementId = req.query.lastElementId;

      let conditions: donationConditions = {
        status: donationStatus.DISPONIVEL,
      };

      if (lastElementId) {
        const isValidId = isValidObjectId(lastElementId);

        if (!isValidId) {
          return res.status(400).send({
            message: 'A formatação do id informado na requisição é inválida.',
            data: {
              lastElementId,
            },
          });
        }

        conditions = {
          _id: {
            $lt: lastElementId,
          },
          ...conditions,
        };
      }

      const projection = {
        _id: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        user: true,
      };

      const donations = await DonationModel.find(conditions, projection)
        .sort({ _id: -1 })
        .limit(25)
        .populate({
          path: 'user',
          select: '-_id name address phone',
        });

      return res.status(200).send(donations);
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

      return res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
  }

  static async getDonationsByZipCode(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const lastElementId = req.query?.lastElementId;
      const zipCode = req.params?.zipCode;

      let conditions: donationConditions = {
        status: donationStatus.DISPONIVEL,
        'address.zipCode': zipCode?.replace(/-/g, ''),
      };

      if (lastElementId) {
        const isValidId = isValidObjectId(lastElementId);

        if (!isValidId) {
          return res.status(400).send({
            message: 'A formatação do id informado na requisição é inválida.',
            data: {
              lastElementId,
            },
          });
        }

        conditions = {
          _id: {
            $lt: lastElementId,
          },
          ...conditions,
        };
      }

      const projection = {
        _id: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        user: true,
      };

      const donations = await DonationModel.find(conditions, projection)
        .sort({ _id: -1 })
        .limit(25)
        .populate({
          path: 'user',
          select: '-_id name address phone',
        });

      return res.status(200).send(donations);
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

      return res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
  }

  static async getDonationsCouter(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const donationsAvailable = await redis.client.get('donationsAvailable');
      const donationsCollected = await redis.client.get('donationsCollected');

      return res.status(200).send({
        donationsAvailable: donationsAvailable || '0',
        donationsCollected: donationsCollected || '0',
      });
    } catch (error: any) {
      logger.error({
        message: 'Ocorreu um erro interno.',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

      return res.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
  }
}

export { DonationController };
