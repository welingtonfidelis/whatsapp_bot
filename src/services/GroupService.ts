import { GroupRepository } from '../repositories';

const groupRepository = new GroupRepository();

class GroupService {
  index() {
    return groupRepository.index();
  }

  store(name: string, description: string) {
    return groupRepository.store(name, description);
  }

  update(id: number, name: string) {
    return groupRepository.update(id, name);
  }

  delete(id: number) {
    return groupRepository.delete(id);
  }
};

export { GroupService };
