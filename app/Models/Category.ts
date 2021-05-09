import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Publication from 'App/Models/Publication'

export default class Category extends BaseModel {
  public static table = 'categories'

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @manyToMany(() => Publication, {
    pivotTable: 'publication_categories',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'publication_id'
  })
  public publications: ManyToMany<typeof Publication>  
}
