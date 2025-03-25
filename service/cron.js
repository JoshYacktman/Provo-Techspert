const cron = require("node-cron");
const { User, Token } = require("./db");

function startCronJobs() {
  cron.schedule("0 0 * * *", async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await Token.deleteMany({ createdAt: { $lt: sevenDaysAgo } });

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const users = await User.find({});
    for (const user of users) {
      const chats = user.chats;
      let modified = false;
      for (const [chatName, chatData] of chats.entries()) {
        if (chatData.lastMessageAt < thirtyDaysAgo) {
          chats.delete(chatName);
          modified = true;
        }
      }
      if (modified) await user.save();
    }
    console.log("Cron job completed: cleaned old tokens and chats");
  });
}

module.exports = { startCronJobs };
