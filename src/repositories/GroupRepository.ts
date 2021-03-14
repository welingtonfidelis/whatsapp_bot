import { getRepository } from 'typeorm'
import { Group } from '../models';

class GroupRepository {
  async index(page: number, limit: number) {
    const repository = getRepository(Group);

    const total = await repository.count();

    console.log(total);
    
    const groups = await repository.find({
      skip: page,
      take: limit,
      order: { id: 'ASC' },
    });

    return { total, groups }
  }

  store(name: string, description: string) {
    const repository = getRepository(Group);

    const command = repository.create({ name, description });

    return repository.save(command);
  }

  async update(id: number, name: string) {
    const repository = getRepository(Group);

    const group = await repository.findOne({ id });

    return repository.update(id, { ...group, name });
  }

  delete(id: number) {
    const repository = getRepository(Group);

    return repository.delete({ id });
  }

}

export { GroupRepository }