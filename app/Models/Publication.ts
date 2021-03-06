import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import { StatePublicationsEnum, TypePublicationsEnum } from 'Contracts/models'
import PublicationsTopic from 'App/Models/PublicationsTopic'

export default class Publication extends BaseModel {

  public static table = "publications"

  @column({ isPrimary: true })
  public id: string

  @column()
  public  title: string

  @column()
  public subtitle: string

  @column()
  public content: string

  @column()
  public image: string

  @column()
  public video: string

  @column()
  public typePublication: TypePublicationsEnum

  @column()
  public statePublication: StatePublicationsEnum

  @column()
  authorId: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public publishedAt: DateTime

  @hasOne(() => PublicationsTopic)
  public publicationsTopics: HasOne<typeof PublicationsTopic>
}
