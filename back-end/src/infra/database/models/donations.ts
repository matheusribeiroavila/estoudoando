import { type InferSchemaType, model, Schema } from 'mongoose';

const donationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    chatId: {
      type: Number,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      zipCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      uf: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

type IDonation = InferSchemaType<typeof donationSchema>;

const DonationModel = model<IDonation>('Donations', donationSchema);

export { DonationModel };
