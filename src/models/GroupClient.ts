import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index
} from 'typeorm'
import { Client } from './Client';
import { Group } from './Group';

@Entity('groups_clients')
@Unique('UNIQUE_GROUP_CLIENT', ["group_id", "client_id"]) 
class GroupClient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    group_id: number;

    @ManyToOne(() => Group)
    @JoinColumn({ name: "group_id" })
    group: Group

    @Column()
    @Index({ unique: true })
    client_id: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: "client_id" })
    client: Client

    constructor(id: number, group_id: number, client_id: number) {
        this.id = id;
        this.group_id = group_id;
        this.client_id = client_id;
    }
}

export { GroupClient }