/*INSERT GROUP ID AND COOKIE BELOW*/

var groupId = 6363810; // << Replace 12345 with your Group Id
var cookie =
  "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5A3B3C6015008EA6F997893BD04C1CFA4495A45DCFECCB339B5CB89C20B497B0431AC4C16850D56310122BDCCF59E0B79C49C6D467527F24B72E0EAA79E0732114E1214630A203E6604DBC2D85957C86644F93E88BA527C5196D0EBAFD041B2D2DCC0CBB65105E40F09F2200490706FEAD00B26493179A42DFCC065D50AC4CEAD37F78580DAA895BD362C98BC4E1EFF03472F6CC67CD2B0048A2A9F4AFD64736E2B7A5BD878F1D1A013AE7AB281C20C5C91D8D4BF9882BF0C6E101F6F88A9E25411404AC76ACA09FEA9251503E7CB225BA61FA42FB971345AD5DB23F77CCD47A01BCD8464E8B12E2AC55AF8AD473474F9A65B6F336B2630703B357D35BA861B3109760BD6D5A92F02BD18E4D241F9DA2878EC3C2DB90A73D83951198AB8DA65E84DD2562"; // << Put your account cookie inside of the quotes

/*INSERT GROUP ID AND COOKIE ABOVE*/

const express = require("express");
const rbx = require("noblox.js");
const app = express();
const discord = require("discord.js");
const client = new discord.Client();
const eco = require("discord-economy");

app.use(express.static("public"));

async function startApp() {
  await rbx.setCookie(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
  rbx.shout(
    groupId,
    "How was your weekend last week? By: x_boss23, and EfazDev and go follow him on Roblox and shoutout to him because he helps me make my games and if you want to be a m,lod play are game and buy the gamepasses and c."
  );
  client.on("ready", () => {
    console.log("Hello! My name is " + currentUser.UserName);
  });
}
startApp();
app.get("/demote", (req, res) => {
  var User = req.param("userid");
  var Group = req.param("group");
  rbx.demote(Group, User);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/startbot.html");
});

app.get("/ranker", (req, res) => {
  var User = req.param("userid");
  var Rank = req.param("rank");

  rbx.setRank(groupId, parseInt(User), parseInt(Rank));
  res.json("Ranked!");
});
client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  member.guild.channels
    .get("813607522103459930")
    .send("Welcome to the Server, " + member);
});
client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith("!kick")) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("No Perms to kick");
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to kick the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});
client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith("!")) {
    const cmd = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Commands")
      .setAuthor(
        "Brianna Bot",
        "https://cdn.discordapp.com/avatars/813603372238241813/f942c894f8a8d9221f18ad7d28b17352.png"
      )
      .setDescription("View all ther commands of the bot here")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/813603372238241813/f942c894f8a8d9221f18ad7d28b17352.png"
      )
      .addFields(
        { name: "!kick", value: "Kicks a User" },
        { name: "!ban", value: "Bans a User" },
        { name: "!userinfo", value: "Review info of the user", inline: true },
        { name: "e!balance", value: "Shows balance", inline: true },
        { name: "e!daily", value: "Get a daily reward!", inline: true },
        { name: "e!resetdaily", value: "Resets you daily", inline: true },
        { name: "e!leaderboard", value: "Get a daily reward!", inline: true },
        { name: "e!transfer", value: "Transfer to another user", inline: true }
      )
      .setTimestamp()
      .setFooter("Made by EfazDev");
    message.reply(cmd);
  }
});
client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith("!ban")) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("No Perms to ban");
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: "They were bad!"
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to ban the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});
client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith("!userinfo")) {
    message.reply("User Info: " + message.author.username);
    message.reply("Joined Discord: " + message.author.createdAt);
    message.reply("Picture: " + message.author.displayAvatarURL());
  }
});
//Set the prefix and token of the bot.
const settings = {
  prefix: "e!"
};

//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on("message", async message => {
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content
    .toLowerCase()
    .slice(settings.prefix.length)
    .split(" ")[0];

  //These are the arguments behind the commands.
  var args = message.content.split(" ").slice(1);

  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot)
    return;

  if (command === "balance") {
    var output = await eco.FetchBalance(message.author.id);
    message.channel.send(
      `Hey ${message.author.tag}! You own ${output.balance} coins.`
    );
  }

  if (command === "daily") {
    var output = await eco.Daily(message.author.id);
    //output.updated will tell you if the user already claimed his/her daily yes or no.

    if (output.updated) {
      var profile = await eco.AddToBalance(message.author.id, 100);
      message.reply(
        `You claimed your daily coins successfully! You now own ${profile.newbalance} coins.`
      );
    } else {
      message.channel.send(
        `Sorry, you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!`
      );
    }
  }

  if (command === "resetdaily") {
    var output = await eco.ResetDaily(message.author.id);

    message.reply(output); //It will send 'Daily Reset.'
  }

  if (command === "leaderboard") {
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)

    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      });
      message.channel.send(
        `The user ${
          message.mentions.users.first().tag
        } is number ${output} on my leaderboard!`
      );
    } else {
      eco
        .Leaderboard({
          limit: 3, //Only takes top 3 ( Totally Optional )
          filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
        })
        .then(async users => {
          //make sure it is async

          if (users[0])
            var firstplace = await client.fetchUser(users[0].userid); //Searches for the user object in discord for first place
          if (users[1])
            var secondplace = await client.fetchUser(users[1].userid); //Searches for the user object in discord for second place
          if (users[2])
            var thirdplace = await client.fetchUser(users[2].userid); //Searches for the user object in discord for third place

          message.channel.send(`My leaderboard:
 
1 - ${(firstplace && firstplace.tag) || "Nobody Yet"} : ${(users[0] &&
            users[0].balance) ||
            "None"}
2 - ${(secondplace && secondplace.tag) || "Nobody Yet"} : ${(users[1] &&
            users[1].balance) ||
            "None"}
3 - ${(thirdplace && thirdplace.tag) || "Nobody Yet"} : ${(users[2] &&
            users[2].balance) ||
            "None"}`);
        });
    }
  }

  if (command === "transfer") {
    var user = message.mentions.users.first();
    var amount = args[1];

    if (!user)
      return message.reply("Reply the user you want to send money to!");
    if (!amount) return message.reply("Specify the amount you want to pay!");

    var output = await eco.FetchBalance(message.author.id);
    if (output.balance < amount)
      return message.reply(
        "You have fewer coins than the amount you want to transfer!"
      );

    var transfer = await eco.Transfer(message.author.id, user.id, amount);
    message.reply(
      `Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`
    );
  }

  if (command === "coinflip") {
    var flip = args[0]; //Heads or Tails
    var amount = args[1]; //Coins to gamble

    if (!flip || !["heads", "tails"].includes(flip))
      return message.reply("Please specify the flip, either heads or tails!");
    if (!amount) return message.reply("Specify the amount you want to gamble!");

    var output = await eco.FetchBalance(message.author.id);
    if (output.balance < amount)
      return message.reply(
        "You have fewer coins than the amount you want to gamble!"
      );

    var gamble = await eco
      .Coinflip(message.author.id, flip, amount)
      .catch(console.error);
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
  }

  if (command === "dice") {
    var roll = args[0]; //Should be a number between 1 and 6
    var amount = args[1]; //Coins to gamble

    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll)))
      return message.reply(
        "Specify the roll, it should be a number between 1-6"
      );
    if (!amount) return message.reply("Specify the amount you want to gamble!");

    var output = eco.FetchBalance(message.author.id);
    if (output.balance < amount)
      return message.reply(
        "You have fewer coins than the amount you want to gamble!"
      );

    var gamble = await eco
      .Dice(message.author.id, roll, amount)
      .catch(console.error);
    message.reply(
      `The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`
    );
  }

  if (command === "work") {
    //I made 2 examples for this command! Both versions will work!

    var output = await eco.Work(message.author.id);
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0)
      return message.reply(
        "Awh, you did not do your job well so you earned nothing!"
      );
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`);

    var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ["cashier", "shopkeeper"]
    });
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0)
      return message.reply(
        "Awh, you did not do your job well so you earned nothing!"
      );

    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`);
  }

  if (command === "slots") {
    var amount = args[0]; //Coins to gamble

    if (!amount) return message.reply("Specify the amount you want to gamble!");

    var output = await eco.FetchBalance(message.author.id);
    if (output.balance < amount)
      return message.reply(
        "You have fewer coins than the amount you want to gamble!"
      );

    var gamble = await eco
      .Slots(message.author.id, amount, {
        width: 3,
        height: 1
      })
      .catch(console.error);
    message.channel.send(gamble.grid); //Grid checks for a 100% match vertical or horizontal.
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
