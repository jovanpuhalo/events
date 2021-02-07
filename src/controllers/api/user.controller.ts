import { Body, Controller, Param, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { EditUserDto } from "src/dtos/user/edit.user.dto";
import { User } from "src/entities/user.entity";
import { ApiResponse } from "src/misc/apiResponse";
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
            "updateOneBase"

        ]

    }

})


@Controller('api/user')
export class UserController {
    constructor(
        public service: UserService
    ) { }

    @Patch(':id')
    editUser(@Body() data: EditUserDto, @Param('id') id): Promise<User | ApiResponse> {
        return this.service.editUserById(id, data);
    }

}