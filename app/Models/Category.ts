import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Publications from 'App/Models/Publication'


export default class Category extends BaseModel {
  public static table = 'categories'

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @manyToMany(() => Publications, {
    pivotForeignKey: "category_id",
    pivotRelatedForeignKey: "publication_id"
  })
  public publications: ManyToMany<typeof Publications>
}
