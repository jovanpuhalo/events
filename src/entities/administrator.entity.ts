import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity("administrator")
export class Administrator {

    @PrimaryGeneratedColumn({ name: 'administrator_id', type: 'int', unsigned: true })
    administratorId: number;

    @Column({ type: 'varchar', unique: true, length: '45' })
    username: string;

    @Column({ type: "varchar", name: "password_hash", length: 128 })
    passwordHash: string;

}  