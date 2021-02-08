import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { EditUserDto } from "src/dtos/user/edit.user.dto";
import { User } from "src/entities/user.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { UserService } from "src/services/user/user.service";

@Crud({
    model: {
        type: User
    },
    params: {
        id: {
            field: 'userId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            events: {
                eager: true
            },
        }
    },
    routes: {
        only: [
            "getOneBase",
            "getManyBase",
            "updateOneBase",
            "deleteOneBase"

        ],
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('user')
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
    },


})


@Controller('api/user')
export class UserController {
    constructor(
        public service: UserService
    ) { }

    @Patch(':id')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('user')
    editUser(@Body() data: EditUserDto, @Param('id') id): Promise<User | ApiResponse> {
        return this.service.editUserById(id, data);
    }

}