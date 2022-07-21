import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658257685131 implements MigrationInterface {
    name = 'default1658257685131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statements" DROP CONSTRAINT "statements"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "description_category" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "id_category" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "statements" DROP CONSTRAINT "PK_7f53bcddeb706df7ea7eec10b8d"`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" ADD CONSTRAINT "PK_7f53bcddeb706df7ea7eec10b8d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" ADD CONSTRAINT "FK_da838838004c4ff8990e7b4de9a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statements" ADD CONSTRAINT "FK_4c2f5ca29f8d9cb300a097b82c0" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statements" DROP CONSTRAINT "FK_4c2f5ca29f8d9cb300a097b82c0"`);
        await queryRunner.query(`ALTER TABLE "statements" DROP CONSTRAINT "FK_da838838004c4ff8990e7b4de9a"`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "amount" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" DROP CONSTRAINT "PK_7f53bcddeb706df7ea7eec10b8d"`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statements" ADD CONSTRAINT "PK_7f53bcddeb706df7ea7eec10b8d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "statements" DROP COLUMN "id_category"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "statements" ADD CONSTRAINT "statements" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
