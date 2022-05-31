import { MigrationInterface, QueryRunner } from "typeorm";

export class createInfluence1653658375990 implements MigrationInterface {
    name = 'createInfluence1653658375990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "influence" ("id" SERIAL NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "address" character varying NOT NULL, "person_id" character varying NOT NULL, "personId" integer, CONSTRAINT "PK_696e5e77525b580d79abbe676bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "influence" ADD CONSTRAINT "FK_a13be5e1b4efe904214ac2be083" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "influence" DROP CONSTRAINT "FK_a13be5e1b4efe904214ac2be083"`);
        await queryRunner.query(`DROP TABLE "influence"`);
    }

}
