import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from "graphql"
import { ContactModel } from "./type.ts";
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")

if(!MONGO_URL) throw new GraphQLError("Error en mongo url") 

const client = new MongoClient(MONGO_URL)

await client.connect()

console.log("Conectado a la base de datos")

const db = client.db("Agenda")

const ContactCollection = db.collection<ContactModel>("contacts")

const server = new ApolloServer({typeDefs,resolvers})

const { url } = await startStandaloneServer(server, {
  // deno-lint-ignore require-await
  context: async() => ({ ContactCollection })
})

console.log(`Server ready at: ${url}`);

