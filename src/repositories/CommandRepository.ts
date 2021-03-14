import { getRepository } from 'typeorm';
import { Command } from '../models';

class CommandRepository {
  index() {
    const repository = getRepository(Command);

    return repository.find();
  }
}

export { CommandRepository };
