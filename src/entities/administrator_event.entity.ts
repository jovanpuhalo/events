import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Administrator } from "./administrator.entity";


@Index("uq_administrator_event_event_id_administrator_id", ["eventId", "administratorId"], {
    unique: true,
})
@Index("fk_administrator_event_event_id", ["eventId"], {})
@Index("fk_administrator_event_administrator_id", ["administratorId"], {})

@Entity("administrator_event")
export class AdministratorEvent {
    @PrimaryGeneratedColumn({ type: "int", name: "administrator_event_id", unsigned: true })
    administratorEventId: number;

    @Column({ type: "int", name: "event_id", unsigned: true })
    eventId: number;

    @Column({ type: "int", name: "administrator_id", unsigned: true })
    administratorId: number;

    @ManyToOne(() => Administrator, (administrator) => administrator.administratorEvents, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "administrator_id", referencedColumnName: "administratorId" }])
    administrator: Administrator;

}
