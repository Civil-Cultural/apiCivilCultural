import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Author from 'App/Models/Author' 
import Category from 'App/Models/Category'
import Topic from 'App/Models/Topic'
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
  public text: string

  @column()
  public typePublication: TypePublicationsEnum

  @column()
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
