import { ClientService } from '../services';

const clientService = new ClientService();

class ClientController {
    index(page: number = 1) {
        const limit = 10;
        const skip = limit * (page - 1);

        return clientService.index(skip, limit);
    }

    store(number: string) {
        return clientService.store(number);
    }

    update(id: number, number: string) {
        return clientService.update(id, number);
    }

    delete(id: number) {
        return clientService.delete(id);
    }
    
    deleteByNumber(clientNumber: string) {
        return clientService.deleteByNumber(clientNumber);
    }
}

export { ClientController }