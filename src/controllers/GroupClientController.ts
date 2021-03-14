import { GroupClientService } from '../services';

const groupClientService = new GroupClientService();

class GroupClientController {
    total(groupId: number) {
        return groupClientService.total(groupId);
    }

    indexByGroupId(groupId: number, page: number = 1, limit: number = 10) {
        const skip = limit * (page - 1);

        return groupClientService.indexByGroupId(groupId, skip, limit);
    }

    indexByGroupName(groupName: string, page: number = 1) {
        const limit = 10;
        const skip = limit * (page - 1);

        return groupClientService.indexByGroupName(groupName, skip, limit);
    }

    store(groupId: number, clientNumber: string) {
        return groupClientService.store(groupId, clientNumber);
    }

    deleteByGroupId(groupId: number) {
        return groupClientService.deleteByGroupId(groupId);
    }

    deleteByClientNumber(clientNumber: string) {
        return groupClientService.deleteByClientNumber(clientNumber);
    }
}

export { GroupClientController }