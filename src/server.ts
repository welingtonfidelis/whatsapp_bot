import * as venom from 'venom-bot';
import { promisify } from 'util';

import './database/connect';

import { CommandController, GroupController } from './controllers';

const commandController = new CommandController();
const groupController = new GroupController();

venom
  .create('principalBot')
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
      if (from === '553599261656@c.us') {
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
  async grouplist(from, sendText) {
    const groupList = await groupController.index();

    if (groupList.length) {
      await Promise.all(
        groupList.map(async (item) => {
          await sendText(from, `[${item.id}] ${item.name} - ${item.description}`);
        })
      );
    }
    else await sendText(from, 'No groups');
  },
  async groupadd(from, sendText, args) {
    const [_, __, arg1, arg2] = args;

    await groupController.store(arg1, arg2);

    await sendText(from, `Ok, inserting ${arg1}`);
  },
  async groupupdate(from, sendText, args) {
    const [_, __, arg1, arg2] = args;

    await groupController.update(arg1, arg2);

    await sendText(from, `Ok, updating ${arg2}`);
  },
  async groupremove(from, sendText, args) {
    const [_, __, arg1] = args;

    await groupController.delete(arg1);

    await sendText(from, `Ok, deleting ${arg1}`);
  }
}