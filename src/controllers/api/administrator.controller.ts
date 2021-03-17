import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { jwtSecret } from "src/config/jwt.secret";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { JwtDataDto } from "src/dtos/auth.dto.ts/jwt.data.dto";
import { TokenDto } from "src/dtos/TokenDto";
import { Administrator } from "src/entities/administrator.entity";
import { User } from "src/entities/user.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken'

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    //GET http://localhost:3000/api/administrator
    @Get()
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    getAllAdministrators(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }


    @Get('user')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    getAllUsers(): Promise<User[]> {
        return this.administratorService.getAllUsers();
    }

    @Get(":id")
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    getById(@Param('id') administratorId: number): Promise<Administrator | ApiResponse> {
        return this.administratorService.getById(administratorId);
    }
    @Get('events/:id')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    getAllEventsForUser(@Param('id') id): Promise<Administrator | ApiResponse> {
        return this.administratorService.getById(id);
    }


    @Post()
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    createAdministrator(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorService.createAdministrator(data);
    }

    @Patch(":id")
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    editAdministratorById(@Body() data: EditAdministratorDto, @Param('id') administratorid: number): Promise<Administrator | ApiResponse> {
        return this.administratorService.editAdministratorById(administratorid, data);
    }


    @Post('admin/adminId')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    async getUserIdByToken(@Body() token: TokenDto) {


        let jwtData: JwtDataDto;
        try {
            jwtData = jwt.verify(token.token, jwtSecret);


        } catch (e) {
            throw new HttpException('Bad tokennnnnnnntt found', HttpStatus.UNAUTHORIZED);

        }

        if (jwtData.role === "administrator") {
            const admin = await this.administratorService.getById(jwtData.id)
            if (!admin) {
                throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
            }
        }
        // const admin = await this.administratorService.getById(jwtData.id)

        return jwtData.id;
    }



}