import { Controller, Get } from "@nestjs/common";
import { Administrator } from "src/entities/administrator";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller('api/administrator')
export class AdministratorControler {
    constructor(
        private administratorService: AdministratorService
    ) { }

    //GET http://localhost:3000/api/administrator
    @Get()
    getAll(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }
}