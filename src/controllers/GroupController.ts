import { GroupService } from '../services';

const groupService = new GroupService();

class GroupController {
    total() {
        return groupService.total();
    }

    index(page: number) {
        const limit = 10;
        const skip = limit * (page - 1);

        return groupService.index(skip, page);
    }

    store(name: string, description: string) {
        return groupService.store(name, description);
    }

    update(id: number, name: string) {
        return groupService.update(id, name);
    }

    delete(id: number) {
        return groupService.delete(id);
    }
}

export { GroupController }