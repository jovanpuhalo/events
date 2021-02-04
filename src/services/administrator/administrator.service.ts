import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { Administrator } from 'src/entities/administrator.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ) { }

    getAll(): Promise<Administrator[]> {

        return this.administrator.find();
    }

    getById(id: number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator> {
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.updata(data.password);

        const passwordHashString = passwordHash.digest('hex').topUpperCase();

        const newAdmin = new Administrator();

        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return this.administrator.save(newAdmin);
    }

    async editAdministratorById(id: number, data: EditAdministratorDto): Promise<Administrator> {
        let oldadmin: Administrator = await this.administrator.findOne(id)
        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.updata(data.password);

        const passwordHashString = passwordHash.digest('hex').topUpperCase();

        const newAdmin = new Administrator();


        newAdmin.username = oldadmin.username
        newAdmin.passwordHash = passwordHashString;

        return this.administrator.save(newAdmin);
    }

}
