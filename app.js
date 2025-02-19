/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  app.on(["issues.opened", "issue_comment.created"], async (context) => {
    if (context.isBot) return;  // Don't want recursive - effect
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });
};
