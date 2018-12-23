const Enmap = require("enmap");
const colors = require("chalk");
module.exports = async Bot => {
  Bot.xpDB = new Enmap({
    name: "Experience Database"
  });
  Bot.administration = new Enmap({
    name: "Administration"
  });
  Bot.warnings = new Enmap({
    name: "Warnings Database"
  });

  Bot.xpDB.defer.then(() => {
    console.log(
      colors.yellow("Experience Database has been loaded into memory!")
    );
  });
  Bot.administration.defer.then(() => {
    console.log(
      colors.yellow("Administration Database has been loaded into memory!")
    );
  });
  Bot.warnings.defer.then(() => {
    console.log(colors.yellow("Warning Database has been loaded into memory!"));
  });
  Bot.commands = new Enmap();
  Bot.aliases = new Enmap();
  Bot.permissions = new Enmap();
  Bot.categories = new Enmap();
  Bot.categoriesNoDups = new Enmap();
  Bot.modules = new Enmap();
  console.log(colors.green(`Finished Loading Databases.`));
};
