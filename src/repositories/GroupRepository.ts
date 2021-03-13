import { getRepository } from 'typeorm'
import { Group } from '../models';

class GroupRepository {
    index() {
      const repository = getRepository(Group);

      return repository.find();
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