import { Router } from 'express';

import { DonationController } from '../controllers';

const donations = Router();

donations.get('/', DonationController.getDonations);
donations.get('/zipCode/:zipCode', DonationController.getDonationsByZipCode);
donations.get('/counter', DonationController.getDonationsCouter);

export { donations };
