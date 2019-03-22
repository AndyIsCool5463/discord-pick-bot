const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers/resolver");
module.exports = async Bot => {
  const resolvers = {
    Query: {
      fetchTop10Chatters: (parent, args) => {
        const id = args.guildID;
        const filtered = Bot.xpDB.filter(p => p.guild === id).array();

        // Sort it to get the top results... well... at the top. Y'know.
        const sorted = filtered.sort((a, b) => b.points - a.points);

        // Slice it, dice it, get the top 10 of it!
        const top10 = sorted.splice(0, 10);
        //  return top10;
        var newA = [];
        var a = u => {
          console.log(u);
          try {
            return Bot.users.find(c => c.id === u).username;
          } catch (e) {
            console.log("YEETerror:" + e);
            //   Bot.xpDB.delete(`497946723868737567-${u}`);
          }
        };
        top10.forEach((c, i) => {
          newA.push({
            username: a(c.user),
            id: c.user,
            xp: c.points,
            level: c.level,
            guild: c.guild
          });
        });
        console.log("NEW A");
        console.log(newA);
        return newA;
      }
    },
    Mutation: {}
  };
  // 3
  const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers
  });
  server.start(() => console.log(`Server is running on http://localhost:4000`));
};
