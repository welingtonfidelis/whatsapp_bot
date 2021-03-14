import { getRepository } from 'typeorm'
import { Client } from '../models';

class ClientRepository {
  total() {
    const repository = getRepository(Client);

    return repository.count();
  }

  index(page: number, limit: number) {
    const repository = getRepository(Client);

    return repository.find({
      skip: page,
      take: limit,
      order: { id: 'ASC' }
    });
  }

  store(number: string) {
    const repository = getRepository(Client);

    const client = repository.create({ number });

    return repository.save(client);
  }

  update(id: number, number: string) {
    const repository = getRepository(Client);

    return repository.update(id, { number });
  }

  delete(id: number) {
    const repository = getRepository(Client);

    return repository.delete({ id });
  }

  deleteByNumber(clientNumber: string) {
    const repository = getRepository(Client);

    return repository.delete({ number: clientNumber });
  }
}

export { ClientRepository }