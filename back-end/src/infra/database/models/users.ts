import { type InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      defalut: null,
    },
    chatId: {
      type: Number,
      required: true,
      index: true,
    },
    address: {
      zipCode: {
        type: String,
        required: false,
        default: null,
      },
      city: {
        type: String,
        required: false,
        default: null,
      },
      uf: {
        type: String,
        required: false,
        default: null,
      },
    },
    phone: {
      type: String,
      required: false,
      default: null,
    },
    eula: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

type IUser = InferSchemaType<typeof userSchema>;

const UserModel = model<IUser>('users', userSchema);

export { UserModel };
