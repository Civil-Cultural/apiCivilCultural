import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Publications from 'App/Models/Publication'


export default class Topic extends BaseModel {
  public static table = "topics"

  public static connection = 'pg'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @manyToMany(() => Publications, {
    pivotForeignKey: "topic_id",
    pivotRelatedForeignKey: "publication_id"
  })
  public publications: ManyToMany<typeof Publications>
}
