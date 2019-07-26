import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './auth.users.service';
import { JwtPayload } from './interfaces/auth.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from './interfaces/auth.interface';
import { AuthSettings } from '../common/settings';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { Messages } from '../common/Messages';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, @InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }

    async register(registerUserDto: RegisterUserDto) {
        let status: RegistrationStatus = { success: true, message: 'user register' };

        await this.userModel.register(new this.userModel({ email: registerUserDto.email, firstName: registerUserDto.firstName, lastName: registerUserDto.lastName }), registerUserDto.password,
            (err) => {
                if (err) {
                    status = { success: false, message: err };
                }
            });
        return status;
    }

    createToken(loginUserDto: LoginUserDto) {
        var user = this.usersService.findOne({ username: loginUserDto.email }).then(user => {
            if (!user) {
                throw new HttpException(Messages.UserNotFound, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const expiresIn = 3600;

            const accessToken = jwt.sign({
                id: user.id,
                email: user.email,
                firstname: user.firstName,
                lastname: user.lastName
            }, AuthSettings.Key, { expiresIn });

            return {
                expiresIn,
                accessToken,
            };
        });
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }
}
