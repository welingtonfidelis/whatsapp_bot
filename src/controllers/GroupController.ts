import { GroupService } from '../services';

const groupService = new GroupService();

class GroupController {
    index() {
        return groupService.index();
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