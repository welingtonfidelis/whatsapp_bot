import { GroupClientRepository } from '../repositories';

const groupClientRepository = new GroupClientRepository();

class GroupClientService {
  total(groupId: number) {
    return groupClientRepository.total(groupId);
  }

  indexByGroupId(groupId: number, page: number, limit: number) {
    return groupClientRepository.indexByGroupId(groupId, page, limit);
  }

  indexByGroupName(groupName: string, page: number, limit: number) {
    return groupClientRepository.indexByGroupName(groupName, page, limit);
  }

  store(groupId: number, clientNumber: string) {
    return groupClientRepository.store(groupId, clientNumber);
  }

  deleteByGroupId(groupId: number) {
    return groupClientRepository.deleteByGroupId(groupId);
  }

  deleteByClientNumber(clientNumber: string) {
    return groupClientRepository.deleteByClientNumber(clientNumber);
  }
};

export { GroupClientService };
