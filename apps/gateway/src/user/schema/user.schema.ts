import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  clerkUserId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: 'admin' | 'user';

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({ required: true, default: Date.now() })
  lastSeenAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
