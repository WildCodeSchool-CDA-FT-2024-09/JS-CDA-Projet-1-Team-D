import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { buildSchema } from "type-graphql";
import SampleResolver from "./resolvers/sample.resolvers";

(async () => {
  await AppDataSource.initialize();

  // Schema sample
  const schema = await buildSchema({
    resolvers: [SampleResolver],
  });

  const server = new ApolloServer({ schema });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
  });

  /* eslint-disable no-console */
  console.log(`🚀  Server ready at: ${url}`);
})();
