import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  public static table = 'categories'

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

}
