import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      this.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')

      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.string('name', 500).notNullable()

      table.string('email').unique('user_unique_email').notNullable()

      table.string('password').notNullable()

      table.string('language', 5).notNullable()

      table.string('country', 500).notNullable()

      table.text('work_career').notNullable()
      
      table.text('jobs').notNullable()

      table.bigInteger('identity_number').notNullable()

      table.enum('type_user', ['2540', '2680']).notNullable()

      table.timestamp('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
