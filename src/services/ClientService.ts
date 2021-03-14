import { ClientRepository } from '../repositories';

const clientRepository = new ClientRepository();

class ClientService {
  total() {
    return clientRepository.total();
  }

  index(page: number, limit: number) {
    return clientRepository.index(page, limit);
  }

  store(number: string) {
    return clientRepository.store(number);
  }

  update(id: number, number: string) {
    return clientRepository.update(id, number);
  }

  delete(id: number) {
    return clientRepository.delete(id);
  }

  deleteByNumber(clientNumber: string) {
    return clientRepository.deleteByNumber(clientNumber);
  }
}

export { ClientService };
