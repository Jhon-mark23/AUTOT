const fs = require("fs");

module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    role: 0,
    credits: "kylepogi",
    description: "Display the prefix of your bot",
    usages: "prefix",
    cooldown: 20,
    aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
    const { threadID, messageID, body } = event;

    if (!prefix) {
        api.sendMessage(
            "𝘀𝗼𝗿𝗿𝘆 𝗭𝗲𝗻𝗽𝗮𝗶 𝗜 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝗮 𝗽𝗿𝗲𝗳𝗶𝘅 𝘀𝗲𝘁.(◍•ᴗ•◍)",
            threadID,
            messageID
        );
        return;
    }

    // Check if the command is invoked manually with the prefix
    if (body.toLowerCase() === `${prefix}prefix`) {
        api.sendMessage(
            `𝗛𝗲𝘆𝘆 𝗭𝗲𝗻𝗽𝗮𝗶 𝘁𝗵𝗲𝗿𝗲! 𝗠𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [  ${prefix}  ].`,
            threadID,
            messageID
        );
        return;
    }

    // Sending the message along with the attachment
    api.sendMessage(
        {
            body: `𝗛𝗲𝗹𝗹𝗼 𝗭𝗲𝗻𝗽𝗮𝗶, 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [ ${prefix}  ]\n▬▬▬▬▬▬▬▬▬▬▬▬\n[📚]-𝗛𝗼𝘄 𝗧𝗼 𝗨𝘀𝗲𝗱??\n➥ ${prefix}help [number of page] -> see commands\n➥ ${prefix}sim [message] -> talk to bot\n➥ ${prefix}callad [message] -> report any problem encountered\n➥ ${prefix}help [command] -> information and usage of command\n\nHave fun using it, enjoy! ❤️\n▬▬▬▬▬▬▬▬▬▬▬▬`,
            attachment: fs.createReadStream(__dirname + "/cache2/prefix.jpeg")
        },
        threadID,
        (err, messageInfo) => {
            if (err) return console.error(err);

            const voiceFile = fs.readFileSync(__dirname + "/cache2/prefix.jpeg");
            api.sendMessage(
                {
                    attachment: voiceFile,
                    type: "audio",
                    body: "Hey, listen to my prefix information!",
                },
                threadID,
                () => {}
            );
            api.setMessageReaction("🌐", messageInfo.messageID, (err) => {}, true);
        }
    );
};
