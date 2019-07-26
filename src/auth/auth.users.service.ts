import { Model, PassportLocalModel } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Messages } from '../common/messages';


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(options: object): Promise<User> {
        return await this.userModel.findOne(options).exec();
    }

    async findById(ID: number): Promise<User> {
        return await this.userModel.findById(ID).exec();
    }

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(ID: number, newValue: User): Promise<User> {
        const user = await this.userModel.findById(ID).exec();

        if (!user.id) {
            throw new HttpException(Messages.itemDoesNotExists, 404);
        }

        await this.userModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.userModel.findById(ID).exec();
    }


    async delete(ID: number): Promise<string> {
        await this.userModel.findByIdAndRemove(ID).exec();
        return;
    }
}