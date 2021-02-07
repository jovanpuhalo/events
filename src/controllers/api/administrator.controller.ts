import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { User } from "src/entities/user.entity";
import { ApiResponse } from "src/misc/apiResponse";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller('api/administrator/')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    //GET http://localhost:3000/api/administrator
    @Get()
    getAllAdministrators(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }
    // @Get('user')
    // getAllUsers(): Promise<User[]> {
    //     return this.administratorService.getAllUsers();
    // }

    @Get(":id")
    getById(@Param('id') administratorId: number): Promise<Administrator | ApiResponse> {
        return this.administratorService.getById(administratorId);
    }



    @Post()
    createAdministrator(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorService.createAdministrator(data);
    }

    @Patch(":id")
    editAdministratorById(@Body() data: EditAdministratorDto, @Param('id') administratorid: number): Promise<Administrator | ApiResponse> {
        return this.administratorService.editAdministratorById(administratorid, data);
    }

}