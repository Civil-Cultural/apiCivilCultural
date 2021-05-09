import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'

export default class User extends BaseModel {
  public static table = 'users'

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
  public language: string

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'favorite_categories',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'category_id'
  })
  public favoriteCategories: ManyToMany<typeof Category>

  @manyToMany(() => Publication, {
    pivotTable: 'favorite_publications',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'publication_id'
  })
  public favoritePublications: ManyToMany<typeof Publication>

  @beforeSave()
  public static async hashPassword(user: User): Promise<void> {
    if(user.$dirty.password)
        user.password = await Hash.make(user.password)
  }
}
