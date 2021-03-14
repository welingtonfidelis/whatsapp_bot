import * as venom from 'venom-bot';
import 'dotenv';

import './database/connect';

import {
 ExecuteCommandService
} from './services'

const executeCommandService = new ExecuteCommandService();

venom
  .create('main_bot')
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(venomClient) {
  venomClient.onMessage(async (message) => {
    const { from, to, sender, type, body } = message;
    const { name } = sender;

    try {
      if (from === `${process.env.CENTRAL_NUMBER}@c.us`) {
        if (type === 'chat' && body) {
          const command = body.split('/');
          const [_, option] = command;

          const executeCommand = executeCommandService.executeCommandList[option]
          if (executeCommand) await executeCommand(from, venomClient, command);
          else venomClient.sendText(from, '🤔 Wrong Command. Remember, use "/".');
        }
        else venomClient.sendText(from, '🤔 Wrong Command. Remenber, use /commandlist to view possible commands.');
      }
      else {
        venomClient.sendText(from, `Hello ${name} 😄`);
      }
    } catch (error) {
      console.log(error);

      venomClient.sendText(from, 'Error during executing command.');
    }
  });
}