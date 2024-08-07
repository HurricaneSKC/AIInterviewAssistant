import { ObjectId, Document } from "mongodb";

export interface IGuestToken extends Document {
  _id?: ObjectId;
  token: string;
  expiry: Date;
}

export interface IUser extends Document {
  _id?: ObjectId;
  email: string;
  password: string;
}

export interface IVerifyCode extends Document {
  _id?: IUser["_id"];
  verificationCode: string;
  verificationCodeExpiry: { $gt: number };
}
