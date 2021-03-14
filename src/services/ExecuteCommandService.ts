import {
  ClientController, CommandController, GroupController, GroupClientController,
} from '../controllers';

const commandController = new CommandController();
const groupController = new GroupController();
const clientController = new ClientController();
const groupClientController = new GroupClientController();

interface venomClientInterface {
    sendText: Function;
}

class ExecuteCommandService {
    executeCommandList: Object;

    constructor() {
      this.executeCommandList = {
        async commandlist(from: string, venomClient: venomClientInterface) {
          const commandList = await commandController.index();

          await Promise.all(
            commandList.map(async (item) => {
              venomClient.sendText(from, `/${item.name} - ${item.description}.`);
            }),
          );
        },

        async grouptotal(from, venomClient, args) {
          const total = await groupController.total();

          venomClient.sendText(from, `Total groups: ${total}.`);
        },

        async grouplist(from, venomClient, args) {
          const [_, __, page] = args;

          const groups = await groupController.index(page);

          if (!groups.length) {
            venomClient.sendText(from, 'No groups.');
            return;
          }

          await Promise.all(
            groups.map(async (item) => {
              venomClient.sendText(from, `[ ID: ${item.id} ] ${item.name} - ${item.description}.`);
            }),
          );
        },

        async groupadd(from, venomClient, args) {
          const [_, __, name, description] = args;

          await groupController.store(name, description);

          venomClient.sendText(from, `Ok, inserting ${name}.`);
        },

        async groupupdate(from, venomClient, args) {
          const [_, __, id, name] = args;

          await groupController.update(id, name);

          venomClient.sendText(from, `Ok, updating ${name}.`);
        },

        async groupremove(from, venomClient, args) {
          const [_, __, id] = args;

          await groupController.delete(id);

          venomClient.sendText(from, `Ok, deleting ${id}.`);
        },

        async clienttotal(from, venomClient, args) {
          const total = await clientController.total();

          venomClient.sendText(from, `Total clients: ${total}.`);
        },

        async clientlist(from, venomClient, args) {
          const [_, __, page] = args;

          const clients = await clientController.index(page);

          if (!clients.length) {
            venomClient.sendText(from, 'No clients.');
            return;
          }

          await Promise.all(
            clients.map(async (item) => {
              venomClient.sendText(from, `[ ID: ${item.id} ] ${item.number}.`);
            }),
          );
        },

        async clientadd(from, venomClient, args) {
          const [_, __, clientNumbers] = args;

          const arrayNumber: string[] = clientNumbers.split(',').map((item) => item.trim());

          await Promise.all(
            arrayNumber.map(async (number) => {
              if (number.length !== 12) {
                venomClient.sendText(from, `Error inserting ${number}. Remember, use 553599999999.`);
                return;
              }

              await clientController.store(number);

              venomClient.sendText(from, `Ok, inserting ${number}.`);
            }),
          );
        },

        async clientupdate(from, venomClient, args) {
          const [_, __, id, number] = args;

          await clientController.update(id, number);

          venomClient.sendText(from, `Ok, updating ${number}.`);
        },

        async clientremove(from, venomClient, args) {
          const [_, __, id] = args;

          await clientController.delete(id);

          venomClient.sendText(from, `Ok, deleting ${id}.`);
        },

        async clientremovebynumber(from, venomClient, args) {
          const [_, __, clientNumber] = args;

          if (clientNumber.length !== 12) {
            venomClient.sendText(from, `Error deleting ${clientNumber}. Remember, use 553599999999.`);
            return;
          }

          await clientController.deleteByNumber(clientNumber);

          venomClient.sendText(from, `Ok, deleting ${clientNumber}.`);
        },

        async groupclienttotal(from, venomClient, args) {
          const [_, __, groupId] = args;

          const total = await groupClientController.total(groupId);

          venomClient.sendText(from, `Total groups: ${total}.`);
        },

        async groupclientlistbygroupid(from, venomClient, args) {
          const [_, __, groupId, page] = args;

          const groupClients = await groupClientController.indexByGroupId(groupId, page);

          if (!groupClients.length) {
            venomClient.sendText(from, 'No clients in group.');
            return;
          }

          await Promise.all(
            groupClients.map(async (item) => {
              await venomClient.sendText(
                from,
                `[ ID: ${item.id} ] [ CLIENT_ID: ${item.client_id} ] ${item.client.number}.`,
              );
            }),
          );
        },

        async groupclientlistbygroupname(from, venomClient, args) {
          const [_, __, groupName, page] = args;

          const groupClients = await groupClientController.indexByGroupName(groupName, page);

          if (!groupClients.length) {
            venomClient.sendText(from, 'No clients in group.');
            return;
          }

          await Promise.all(
            groupClients.map(async (item) => {
              await venomClient.sendText(
                from,
                `[ ID: ${item.id} ] [ CLIENT_ID: ${item.client_id} ] ${item.client.number}.`,
              );
            }),
          );
        },

        async groupclientadd(from, venomClient, args) {
          const [_, __, groupId, clientNumbers] = args;

          const arrayNumber: string[] = clientNumbers.split(',').map((item) => item.trim());

          await Promise.all(
            arrayNumber.map(async (number) => {
              if (number.length !== 12) {
                venomClient.sendText(from, `Error inserting ${number}. Remember, use 553599999999.`);
                return;
              }

              await groupClientController.store(groupId, number);

              venomClient.sendText(from, `Ok, inserting ${number} in ${groupId}.`);
            }),
          );
        },

        async groupclientremovebygroupid(from, venomClient, args) {
          const [_, __, groupId] = args;

          await groupClientController.deleteByGroupId(groupId);

          venomClient.sendText(from, `Ok, deleting ${groupId}.`);
        },

        async groupclientremovebyclientnumber(from, venomClient, args) {
          const [_, __, clientNumber] = args;

          if (clientNumber.length !== 12) {
            venomClient.sendText(from, `Error deleting ${clientNumber}. Remember, use 553599999999.`);
            return;
          }

          await groupClientController.deleteByClientNumber(clientNumber);

          venomClient.sendText(from, `Ok, deleting ${clientNumber}.`);
        },

        async sendmessagetogroup(from, venomClient, args) {
          const [_, __, groupId, message] = args;

          const total = await groupClientController.total(groupId);
          const limit = 50;

          for (let i = 0; i <= (total / limit); i += 1) {
            const groupClients = await groupClientController.indexByGroupId(groupId, i + 1, limit);

            if (!groupClients.length) {
              venomClient.sendText(from, 'No clients.');
              return;
            }

            await Promise.all(
              groupClients.map(async (item) => {
                venomClient.sendText(`${item.client.number}@c.us`, message);
                // .then(result => {
                //     console.log('ENVIADO ===>', item.client.number);
                // })
                // .catch(error => {
                //     console.log('FAILED SEND', item.client.number, error);
                // })
              }),
            );

            venomClient.sendText(from, 'Broadcast message end.');
          }
        },
      };
    }
}

export { ExecuteCommandService };
