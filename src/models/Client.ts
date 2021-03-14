import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm'

@Entity('clients')
class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    constructor(id: number, number: string) {
        this.id = id;
        this.number = number;
    }
}

export { Client }