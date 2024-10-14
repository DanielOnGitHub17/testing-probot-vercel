const { createNodeMiddleware, createProbot } = require("probot");
const app = require("../../../app");

const probot = createProbot({
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure newlines are correctly handled
});

module.exports = createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });