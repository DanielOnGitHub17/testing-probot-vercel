require('dotenv').config();

const { createNodeMiddleware, createProbot } = require("probot");
const app = require("../../../app");
const { createAppAuth } = require("@octokit/auth-app");

// (async () => {
const { Octokit } = import("@octokit/rest");

const octokit = new Octokit({
authStrategy: createAppAuth,
auth: {
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY, // Ensure newlines are correctly handled
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
},
});

const probot = createProbot({
id: process.env.APP_ID,
secret: process.env.WEBHOOK_SECRET,
privateKey: process.env.PRIVATE_KEY, // Ensure newlines are correctly handled
Octokit: octokit,
});

module.exports = createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });
// })();