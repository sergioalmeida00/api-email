
import "reflect-metadata";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "almeidaa00",
  database: "teste",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
    console.log("Connectin")
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;