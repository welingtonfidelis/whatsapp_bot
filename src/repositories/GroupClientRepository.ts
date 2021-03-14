import { getRepository } from 'typeorm'
import { Client, Group, GroupClient } from '../models';

class GroupClientRepository {
  async indexByGroupId(id: number, page: number, limit: number) {
    const repository = getRepository(GroupClient);

    const total = await repository.count({ where: { group_id: id }});

    const groupClients = await repository.find({
      where: { group_id: id },
      skip: page,
      take: limit,
      order: { id: 'ASC' },
      relations: ['client']
    });

    return {
      total,
      groupClients
    }
  }

  async indexByGroupName(name: string, page: number, limit: number) {
    const groupClientRepository = getRepository(GroupClient);
    const groupRepository = getRepository(Group);

    const { id } = await groupRepository.findOne({ where: { name }});

    const total = await groupClientRepository.count({ where: { group_id: id }});

    const groupClients = await groupClientRepository.find({
      where: { group_id: id },
      skip: page,
      take: limit,
      order: { id: 'ASC' },
      relations: ['client']
    });

    return {
      total,
      groupClients
    }
  }

  async store(groupId: number, clientNumber: string) {
    const groupClientRepository = getRepository(GroupClient);
    const clientRepository = getRepository(Client);

    let client = await clientRepository.findOne({ where: { number: clientNumber }});

    if (!client) {
      client = clientRepository.create({ number: clientNumber });
      
      await clientRepository.save(client);
    }

    const { id: clientId } = client;

    const groupClient = groupClientRepository.create({ group_id: groupId, client_id: clientId });

    return groupClientRepository.save(groupClient);
  }

  deleteByGroupId(groupId: number) {
    const repository = getRepository(GroupClient);

    return repository.delete({ group_id: groupId });
  }

  async deleteByClientNumber(clientNumber: string) {
    const groupClientRepository = getRepository(GroupClient);
    const clientRepository = getRepository(Client);

    const client = await clientRepository.findOne({ where: { number: clientNumber }});

    if (client) {
      const { id: clientId } = client;

      return groupClientRepository.delete({ client_id: clientId });
    }
  }
}

export { GroupClientRepository }