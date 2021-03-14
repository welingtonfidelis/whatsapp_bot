import * as venom from 'venom-bot';
import { promisify } from 'util';
import 'dotenv';

import './database/connect';

import {
  ClientController, CommandController, GroupController, GroupClientController
} from './controllers';

const commandController = new CommandController();
const groupController = new GroupController();
const clientController = new ClientController();
const groupClientController = new GroupClientController();

venom
  .create('main_bot')
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  client.onMessage(async (message) => {
    const sendText = promisify(client.sendText).bind(client);

    const { from, to, sender, type, body } = message;
    const { name } = sender;

    console.log('INPUT', type, body);

    try {
      if (from === `${process.env.CENTRAL_NUMBER}@c.us`) {
        if (type === 'chat' && body) {
          const command = body.split('/');
          const [_, option] = command;

          const executeCommand = executeCommandList[option];
          if (executeCommand) await executeCommand(from, sendText, command);
          else await sendText(from, '🤔 Wrong Command. Remember, use "/".');
        }
        else await sendText(from, '🤔 Wrong Command.');
      }
      else await sendText(from, `Hello ${name} 😄`);
    } catch (error) {
      console.log(error);

      await sendText(from, 'Error during executing command');
    }
  });
}

const executeCommandList = {
  async commandlist(from, sendText) {
    const commandList = await commandController.index();

    await Promise.all(
      commandList.map(async (item) => {
        await sendText(from, `/${item.name} - ${item.description}`);
      })
    );
  },

  async grouplist(from, sendText, args) {
    const [_, __, page] = args;

    const { total, groups } = await groupController.index(page);

    if (groups.length) {
      await Promise.all(
        groups.map(async (item) => {
          await sendText(from, `[ ID: ${item.id} ] ${item.name} - ${item.description}`);
        })
      );
    }
    else await sendText(from, 'No groups');
  },

  async groupadd(from, sendText, args) {
    const [_, __, name, description] = args;

    await groupController.store(name, description);

    await sendText(from, `Ok, inserting ${name}`);
  },

  async groupupdate(from, sendText, args) {
    const [_, __, id, name] = args;

    await groupController.update(id, name);

    await sendText(from, `Ok, updating ${name}`);
  },

  async groupremove(from, sendText, args) {
    const [_, __, id] = args;

    await groupController.delete(id);

    await sendText(from, `Ok, deleting ${id}`);
  },

  async clientlist(from, sendText, args) {
    const [_, __, page] = args;

    const clients = await clientController.index(page);

    if (clients.length) {
      await Promise.all(
        clients.map(async (item) => {
          await sendText(from, `[ ID: ${item.id} ] ${item.number}`);
        })
      );
    }
    else await sendText(from, 'No clients');
  },

  async clientadd(from, sendText, args) {
    const [_, __, clientNumbers] = args;

    const arrayNumber: string[] = clientNumbers.split(",").map((item) =>  item.trim());

    await Promise.all(
      arrayNumber.map(async (number) => {
        if (number.length === 12) {
          await clientController.store(number);
    
          await sendText(from, `Ok, inserting ${number}`);
        }
        else await sendText(from, `Error inserting ${number}. Remenber, use 553599999999`);
      })
    )
  },

  async clientupdate(from, sendText, args) {
    const [_, __, id, number] = args;

    await clientController.update(id, number);

    await sendText(from, `Ok, updating ${number}`);
  },

  async clientremove(from, sendText, args) {
    const [_, __, id] = args;

    await clientController.delete(id);

    await sendText(from, `Ok, deleting ${id}`);
  },

  async clientremovebynumber(from, sendText, args) {
    const [_, __, clientNumber] = args;

    if (clientNumber.length === 12) {
      await clientController.deleteByNumber(clientNumber);

      await sendText(from, `Ok, deleting ${clientNumber}`);
    }
    else await sendText(from, `Error deleting ${clientNumber}. Remenber, use 553599999999`);
  },

  async groupclientlistbygroupid(from, sendText, args) {
    const [_, __, groupId, page] = args;

    const { total, groupClients} = await groupClientController.indexByGroupId(groupId, page);

    if (groupClients.length) {
      await Promise.all(
        groupClients.map(async (item) => {
          await sendText(
            from, 
            `[ ID: ${item.id} ] [ CLIENT_ID: ${item.client_id} ] ${item.client.number}`
          );
        })
      );
    }
    else await sendText(from, 'No clients in group');
  },

  async groupclientlistbygroupname(from, sendText, args) {
    const [_, __, groupName, page] = args;

    const { total, groupClients} = await groupClientController.indexByGroupName(groupName, page);

    if (groupClients.length) {
      await Promise.all(
        groupClients.map(async (item) => {
          await sendText(
            from, 
            `[ ID: ${item.id} ] [ CLIENT_ID: ${item.client_id} ] ${item.client.number}`
          );
        })
      );
    }
    else await sendText(from, 'No clients in group');
  },

  async groupclientadd(from, sendText, args) {
    const [_, __, groupId, clientNumbers] = args;

    const arrayNumber: string[] = clientNumbers.split(",").map((item) =>  item.trim());

    await Promise.all(
      arrayNumber.map(async (number) => {
        if (number.length === 12) {
          await groupClientController.store(groupId, number);
    
          await sendText(from, `Ok, inserting ${number} in ${groupId}`);
        }
        else await sendText(from, `Error inserting ${number}. Remenber, use 553599999999`);
      })
    )
  },

  async groupclientremovebygroupid(from, sendText, args) {
    const [_, __, groupId] = args;

    await groupClientController.deleteByGroupId(groupId);

    await sendText(from, `Ok, deleting ${groupId}`);
  },

  async groupclientremovebyclientnumber(from, sendText, args) {
    const [_, __, clientNumber] = args;

    if (clientNumber.length === 12) {
      await groupClientController.deleteByClientNumber(clientNumber);

      await sendText(from, `Ok, deleting ${clientNumber}`);
    }
    else await sendText(from, `Error deleting ${clientNumber}. Remenber, use 553599999999`);
  },

  async sendmessagetogroup(from, sendText, args) {
    const [_, __, groupId, message] = args;

    
  }
}