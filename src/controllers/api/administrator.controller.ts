import { Controller, Get } from "@nestjs/common";
import { Administrator } from "src/entities/administrator";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller()
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    //GET http://localhost:3000/api/administrator
    @Get('api/administrator')
    getAllAdministrators(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }

}