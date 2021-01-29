import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

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

  @column.dateTime({ autoCreate: true })
  public createAt: DateTime

  @beforeSave()
  public static async hashPassword(author: Author) 
  {
    if(author.$dirty.password)
      author.password = await Hash.hash(author.password)
  }
}
