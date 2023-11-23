import { mongoConnectionUrl } from "../config";
import { Collection, MongoClient } from "mongodb";
import { PersistentDatabase } from ".";
export class MongoDatabase implements PersistentDatabase {
  client = new MongoClient(mongoConnectionUrl);
  collection!: Collection;
  async save(identifier: string, object: any) {
    await this.collection.insertOne({
      identifier,
      object,
    });
  }
  async read(identifier: string): Promise<any> {
    return (await this.collection.findOne({ identifier }))!.object;
  }
  async connect() {
    await this.client.connect();
    this.collection = this.client.db().collection("objects");
  }
  async close() {
    await this.client.close();
  }
}
