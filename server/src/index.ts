import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { buildSchema } from "type-graphql";
import CatResolver from "./cats/cat.resolvers";
import LikeResolver from "./likes/like.resolvers";

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CatResolver, LikeResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
  });

  /* eslint-disable no-console */
  console.log(`🚀  Server ready at: ${url}`);
})();
