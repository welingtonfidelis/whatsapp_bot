import { CommandRepository } from '../repositories';

const commandRepository = new CommandRepository();

class CommandService {
  index() {
    return commandRepository.index();
  }
}

export { CommandService };
