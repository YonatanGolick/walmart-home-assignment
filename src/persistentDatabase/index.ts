export { MongoDatabase } from "./mongo";

export interface PersistentDatabase {
  connect(): Promise<void>;
  close(): void;
  save(identifier: string, object: any): Promise<void>;
  read(identifier: string): Promise<any>;
}
