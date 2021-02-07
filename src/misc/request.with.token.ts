import { JwtDataDto } from "src/dtos/auth.dto.ts/jwt.data.dto";

declare module 'express' {
    interface Request {
        token: JwtDataDto;
    }
}
