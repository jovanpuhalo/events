import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";


@Entity("administrator_token")
export class AdministratorToken {
    @PrimaryGeneratedColumn({ type: "int", name: "administrator_token_id", unsigned: true })
    administratorTokenId: number;

    @Column({ type: "int", name: "administrator_id", unsigned: true })
    administratorId: number;

    @Column({ type: "timestamp", name: "created_at" })
    createdAt: string;

    @Column({ type: "text" })

    token: string;

    @Column({ type: "datetime", name: "expires_at" })
    expiresAt: string;


}
