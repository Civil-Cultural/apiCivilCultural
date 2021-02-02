import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import { TypePublicationsEnum } from "Contracts/models"

export default class Publication extends BaseModel {
  public static table = "publications"

  public static connection = "pg"

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
  public text: string

  @column()
  public typePublication: TypePublicationsEnum

  @column()
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
