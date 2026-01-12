import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class userService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async upsertAuthUser(input: {
    clerkUserId: string;
    email: string;
    fullName: string;
  }) {
    const now = new Date();

    return this.userModel.findOneAndUpdate(
      {
        clerkUserId: input.clerkUserId,
      },
      {
        $set: {
          email: input.email,
          fullName: input.fullName,
          lastSeenAt: now,
        },
        $setOnInsert: {
          role: 'user',
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  async findByClerkUserId(clerkUserId: string) {
    const user = this.userModel.findOne({ clerkUserId });

    if (user === undefined) {
      throw new NotFoundException(`User with ID ${clerkUserId} not found`);
    }

    return user;
  }
}
