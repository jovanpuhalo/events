import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { Administrator } from 'src/entities/administrator.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/apiResponse';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>,
        @InjectRepository(User)
        private readonly user: Repository<User>

    ) { }

    getAll(): Promise<Administrator[]> {

        return this.administrator.find(
            {
                select: ["administratorId", "username"],
                relations: ["events"]
            }
        );
    }

    getAllUsers(): Promise<User[]> {
        return this.user.find();
    }

    getById(id: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.administrator.findOne(id, {
                relations: [
                    "events"
                ]
            })
            if (admin == undefined) {
                resolve(new ApiResponse("error", -1002, "Can't find admin with that id"))
            }
            resolve(admin);
        })

    }

    async getByUsername(username: string): Promise<Administrator | null> {
        let admin: Administrator = await this.administrator.findOne({
            where: {
                username: username
            }
        })

        if (admin) {
            return admin;
        }
        return null;
    }


    createAdministrator(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newAdmin = new Administrator();

        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;


        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
                .then(data => resolve(data))
                .catch(error => {
                    const respons: ApiResponse = new ApiResponse("error", -1001, "Can't add new administrator! You may have entered an existing username");
                    resolve(respons);
                })
        })

    }

    async editAdministratorById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        let admin: Administrator = await this.administrator.findOne(id)
        if (admin === undefined) {
            return new Promise(resolve => {
                resolve(new ApiResponse("error", -1002, "Can't find that admin"));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        // const newAdmin = new Administrator();    
        // newAdmin.username = oldadmin.username
        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }

}
