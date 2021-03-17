import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdministratorEvent } from "./administrator_event.entity";
import { Event } from "./event.entity";

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity("administrator")
export class Administrator {

    @PrimaryGeneratedColumn({ name: 'administrator_id', type: 'int', unsigned: true })
    administratorId: number;

    @Column({ type: 'varchar', unique: true, length: '45' })
    username: string;

    @Column({ type: "varchar", name: "password_hash", length: 128 })
    passwordHash: string;

    @ManyToMany(type => Event, event => event.administrators)
    @JoinTable({
        name: "administrator_event",
        joinColumn: { name: "administrator_id", referencedColumnName: "administratorId" },
        inverseJoinColumn: { name: "event_id", referencedColumnName: "eventId" }
    })
    events: Event[];


    @OneToMany(() => AdministratorEvent, (administratorEvent) => administratorEvent.administrator)
    administratorEvents: AdministratorEvent[];


}   