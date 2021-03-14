# whatsapp_bot

Projeto criado em [Node.js], [Typescript], [PostgreSQL] e [TypeORM] com objetivo de possibilitar a criação de um bot no whatsapp para envio de mensagens em broadcast para grupos de números. O uso do whatsapp como canal de comunicação só foi possível através do uso da biblioteca [venom-bot], que é capaz de executar uma instância do WhatsApp Web no servidor. A partir desta lib, foi possível receber e enviar mensagens através do projeto, criar grupos e salvar números para envio de mensagens para múltiplos destinatários de forma automática.

## Requisitos

* [Node.js] - Nodejs 14 ou superior;
* [PostgreSQL] - Uma instância do banco Postgres ou outro banco do tipo relacional;
* Um número de telefone com whatsapp configurado e executando em um smartphone e outro que será cadastrado como responsável pelo envio de comandos ao bot.

## Instalação

Após clonar este projeto, é necessário criar um banco de dados que será utilizado no projeto. Em seguida, crie um arquivo na raiz do projeto seguindo o *.env.example* como referência, inserindo as informações para pleno funcionamento do projeto. Agora, para instalar as dependências necessárias, em seu terminal de comandos ("apontando" para o diretório do projeto) execute o comando **npm install**. Para que seu banco seja atualizado com as tabelas e dados iniciais necessários, execute o comando **npm run migrate:run**. Pronto, seu o está preparado para executar em sua máquina, execute o último comando **npm start** e aguarde a aplicação conectar-se ao banco e exibir um QRCode que deve ser escaneado utilizando o whatsapp no smartphone com o número que será utlizado pelo bot.


## Utilização

Considerando que você tenha um smartphone com o número que incluiu no *.env* como sendo o número de controle do bot, a execução de comandos à ele é feito através do envio de mensagens de texto pelo whatsapp ao número bot. Abaixo estão listados os comandos possíveis e seus efeitos.

* **/commandlist**: Listar todos os comandos possíveis;
* **/grouptotal**: Mostrar total de grupos cadastrados;
* **/grouplist/{page}**: Mostrar todos grupos cadastrados (máximo de 10 por "página");
* **/groupadd/{group_name}/{group_description}**: Criar um novo grupo (nome deve ser único);
* **/grouparm/{group_id}**: Excluir grupo por ID;
* **/groupaupdate/{group_id}/{group_new_name}**: Atualizar grupo;
* **/clienttotal**: Mostrar total de clientes cadastrados;
* **/clientlist/{page}**: Mostrar todos os clientes cadastrados (máximo de 10 por "página");
* **/clientadd/{client_number or client_number,client_number,client_number, ...}**: Adicionar novo cliente (número deve ser único; Pode en-se enviar um único número ou uma lista);
* **/clientupdate/{client_id}/{client_number}**: Atualizar número do cliente por ID;
* **/clientremove/{client_id}**: Excluir cliente por ID;
* **/clientremovebynumber/{client_number}**: Excluir cliente por número;
* **/groupclienttotal/{group_id}**: Mostrar total de clientes por ID de um grupo;
* **/groupclientlistbygroupid/{group_id}/{page}**: Mostrar todos os clientes por ID de um grupo (máximo de 10 por "página");
* **/groupclientlistbygroupname/{group_name}/{page}**: Mostrar todos os clientes por nome de um grupo (máximo de 10 por "página");
* **/groupclientadd/{group_id}/{client_number or client_number,client_number, ...}**: Adicionar um cliente à um grupo por ID do grupo (Pode en-se enviar um único número ou uma list);
* **/groupclientremovebygroupid/{group_id}**: Excluir todos os clientes de um grupo pelo ID do grupo;
* **/groupclientremovebyclientnumber/{client_number}**: Excluir um cliente de um grupo pelo ID do cliente;
* **/sendmessagetogroup/{group_id}/{text_message}**: Enviar uma mensagem de texto para todos os clientes de um grupo pelo ID do grupo.

## Contato
welingtonfidelis@gmail.com
<br>
Sugestões e pull requests são sempre bem vindos 🤓 

License
----

MIT

**Free Software, Hell Yeah!**

[Node.js]: <https://nodejs.org/en/>
[TypeORM]: <https://typeorm.io/#/>
[PostgreSQL]: <https://www.postgresql.org/>
[TypeScript]: <https://www.typescriptlang.org/>
[venom-bot]: <https://www.npmjs.com/package/venom-bot>