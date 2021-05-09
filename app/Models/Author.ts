import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Publications from 'App/Models/Publication'

export default class Author extends BaseModel {
  public static table = 'authors'

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public description?: string

  @column()
  public workCareer?: string

  @column()
  public language: string

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => Publications)
  public publications: HasMany<typeof Publications>

  @beforeSave()
  public static async hashPassword(author: Author): Promise<void> {
    if (author.$dirty.password)
        author.password = await Hash.make(author.password)
  }
}
