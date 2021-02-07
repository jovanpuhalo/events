import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { User } from "src/entities/user.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller('api/administrator/')
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

}