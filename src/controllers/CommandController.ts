import { CommandService } from '../services';

const commandService = new CommandService();

class CommandController {
    async index() {
        return commandService.index();
    }
}

export { CommandController }