import { randomUUID } from "crypto";
import {
  MongoDatabase,
} from "./persistentDatabase";
import { port } from "./config";
import isEqual from "lodash.isequal";

const persistentDatabases = [
  new MongoDatabase(),
] as const;

await Promise.all(persistentDatabases.map((database) => database.connect()));
console.log(`Starting server on port ${port}`);
const server = Bun.serve({
  port,
  development: false,
  async fetch(req) {
    switch (req.method) {
      case "POST": {
        const object = await req.json();
        const identifier = randomUUID();
        await Promise.all(
          persistentDatabases.map(async (database) =>
            database.save(identifier, object),
          ),
        );
        return new Response(identifier);
      }
      case "GET": {
        const pathname = new URL(req.url).pathname;
        if (pathname == "/") return new Response();
        const identifier = pathname.split("/")[1];
        if (!identifier)
          return new Response("Missing identifier in request", { status: 400 });
        const responses = await Promise.all(
          persistentDatabases.map((database) => database.read(identifier)),
        );
        if (!responses.every((val) => isEqual(val, responses[0])))
          return new Response("Data is not replicated correctly", {
            status: 500,
          });
        return new Response(JSON.stringify(responses[0]));
      }
      default: {
        return new Response(undefined, { status: 405 });
      }
    }
  },
});

process.on("SIGINT", async () => {
  console.log("Shutting down server");
  server.stop();
  await Promise.all(persistentDatabases.map((database) => database.close()));
});
