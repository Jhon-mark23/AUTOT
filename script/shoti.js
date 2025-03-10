const axios = require("axios");
const request = require("request");
const fs = require("fs");

module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  credits: "Eugene Aguilar",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "other",
  usage: "[shoti]",
  cooldowns: 20,
  dependencies: [],
  usePrefix: true,
};

module.exports.handleEvent = async function ({ api, event }) {

   if (!(event.body.indexOf("shoti") === 0 || event.body.indexOf("Shoti") === 0)) return; 


    try {
     api.setMessageReaction("🔄", event.messageID, (err) => {}, true);


    const response = await axios.get("https://testapi2-919t.onrender.com/shoti");

      const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
      const userInfo = response;
     const username = userInfo.name || "undefined";
    // const nickname = userInfo.url || "undefined";
     const title = response.description || "undefined";

      const rqs = request(encodeURI(response.url));
      rqs.pipe(file);

      file.on("finish", async () => {

      api.setMessageReaction("🟢", event.messageID, (err) => {}, true);


        await api.sendMessage(
          {
            body: `Username: @${username}\n\nTitle: ${title}`,
            attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
          },
          event.threadID,
          event.messageID
        );
      });

      file.on("error", (err) => {
        api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
      });
    } catch (error) {
     api.setMessageReaction("🔴", event.messageID, (err) => {}, true);
    }
  };
module.exports.run = async function ({ api, event }) {
   api.sendMessage(`This command doesn't need a prefix`, event.threadID, event.messageID);

};
