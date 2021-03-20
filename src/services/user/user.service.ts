import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiResponse } from 'src/misc/apiResponse';
import { EditUserDto } from 'src/dtos/user/edit.user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) {
        super(user);
    }

    getAll(): Promise<User[]> {
        return this.user.find();
    }

    getById(id: number): Promise<User | ApiResponse> {
        return new Promise(async (resolve) => {
            let user = await this.user.findOne(id, {
                relations: [
                    "userEvents",
                    "events",

                ],

            })
            if (user == undefined) {
                resolve(new ApiResponse("error", -2002, "Can't find user with that id"))
            }


            resolve(user);
        })

    }






    async getByUsername(username: string): Promise<User | null> {
        let user: User = await this.user.findOne({
            where: {
                username: username
            }
        })

        if (user) {
            return user;
        }
        return null;
    }


    async createUser(data: AddUserDto): Promise<User | ApiResponse> {
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newUser = new User();

        newUser.username = data.username;
        newUser.passwordHash = passwordHashString;
        newUser.forename = data.forename;
        newUser.surname = data.surname;
        newUser.email = data.email;
        newUser.phoneNumber = data.phoneNumber;
        newUser.address = data.address;
        newUser.validation = '0';

        try {
            const savedUser = await this.user.save(newUser)

            if (!savedUser) {
                throw new Error('');
            }
            return savedUser;
        } catch (e) {

            if (e.sqlMessage.includes('user.uq_user_email')) {
                return new ApiResponse('error', -6002, 'User sa ovim emailom vec postoji');

            }
            if (e.sqlMessage.includes('user.uq_user_phone_number')) {
                return new ApiResponse('error', -6003, 'User sa ovim telefonom vec postoji');

            }
            if (e.sqlMessage.includes('user.uq_user_username')) {
                return new ApiResponse('error', -6004, 'User sa ovim korisnickim imenom vec postoji');

            }
            throw new ApiResponse("error", -1, 'This user cannot be created')
        }

        return new Promise((resolve) => {
            this.user.save(newUser)
                .then(data => resolve(data))
                .catch(error => {
                    const respons: ApiResponse = new ApiResponse("error", -2001, "Can't add new user! You may have entered an existing username, email or phone number");
                    resolve(respons);
                })
        })

    }

    async validationOf(id: number): Promise<User | ApiResponse> {
        let user: User = await this.user.findOne(id)

        if (user === undefined) {
            return new Promise(resolve => {
                resolve(new ApiResponse("error", -2002, "Can't find that user"));
            });
        }
        if (user.validation === '0') {
            user.validation = '1';
            return this.user.save(user);
        }


        if (user.validation === '1') {
            user.validation = '0';
            return this.user.save(user);
        }
    }

    async editUserById(id: number, data: EditUserDto): Promise<User | ApiResponse> {
        let user: User = await this.user.findOne(id)

        if (user === undefined) {
            return new Promise(resolve => {
                resolve(new ApiResponse("error", -2002, "Can't find that user"));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        // const newAdmin = new User();    
        // newAdmin.username = olduser.username
        user.passwordHash = passwordHashString;
        user.forename = data.forename;
        user.surname = data.surname;
        user.address = data.address;


        return this.user.save(user);
    }

}
