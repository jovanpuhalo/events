import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { Administrator } from 'src/entities/administrator.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/apiResponse';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ) { }

    getAll(): Promise<Administrator[]> {

        return this.administrator.find();
    }

    getById(id: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.administrator.findOne(id)
            if (admin == undefined) {
                resolve(new ApiResponse("error", -1002, "Can't find admin with that id"))
            }
            resolve(admin);
        })

    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
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
        let oldadmin: Administrator = await this.administrator.findOne(id)
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newAdmin = new Administrator();


        newAdmin.username = oldadmin.username
        newAdmin.passwordHash = passwordHashString;

        return this.administrator.save(newAdmin);
    }

}
