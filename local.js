/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const ngrok = require('ngrok');
const axios = require('axios');
const express = require('express');
const parser = require('claudia-bot-builder/lib/telegram/parse');
const responder = require('claudia-bot-builder/lib/telegram/reply');

const messageHandler = require('./src/features');

(async () => {
  const token = process.env.TEST_BOT_TOKEN;
  const port = 3000;
  const webhookPath = '/webhook';

  const url = await ngrok.connect(port);

  await axios({
    method: 'GET',
    url: `https://api.telegram.org/bot${token}/setWebhook?url=${url}${webhookPath}`,
  });

  const app = express();

  app.use(express.json());

  app.post(webhookPath, (req, res) => {
    const parsedMessage = parser(req.body);
    const botResponse = messageHandler(parsedMessage);

    responder(parsedMessage, botResponse, token);

    res.sendStatus(200);
  });

  app.listen(port, () => process.stdout.write(`Server started at port ${port}\n`));
})();
