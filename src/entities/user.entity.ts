import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { UserEvent } from "./user_event.entity";

@Index("uq_user_username", ["username"], { unique: true })
@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Entity("user")
export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
    userId: number;

    @Column({ type: "varchar", unique: true, length: 45 })
    email: string;

    @Column({ type: "varchar", unique: true, length: 45 })
    username: string;

    @Column({ type: "varchar", name: "password_hash", length: 128 })
    passwordHash: string;

    @Column({ type: "varchar", length: 45 })
    forename: string;

    @Column({ type: "varchar", length: 45 })
    surname: string;

    @Column({ type: "varchar", name: "phone_number", unique: true, length: 24 })
    phoneNumber: string;

    @Column({ type: "varchar", name: "address", length: 128 })
    address: string;

    @Column({
        type: "enum",
        enum: ['0', '1'],
        default: () => '0',
    })
    validation: '0' | '1';

    @ManyToMany(type => Event, event => event.users)
    @JoinTable({
        name: "user_events",
        joinColumn: { name: "user_id", referencedColumnName: "userId" },
        inverseJoinColumn: { name: "event_id", referencedColumnName: "eventId" }
    })
    events: Event[];

    @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
    userEvents: UserEvent[];

}
