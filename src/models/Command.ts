import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity('commands')
class Command {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string

    constructor(id: number, name: string, description: string) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
}

export { Command };
