import { CommandService } from '../services';

const commandService = new CommandService();

class CommandController {
  index() {
    return commandService.index();
  }
}

export { CommandController };
