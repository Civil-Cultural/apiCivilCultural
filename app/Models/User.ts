import { BaseModel, beforeSave, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'

import { UserEnum } from 'Contracts/models'

export default class User extends BaseModel {
  
  public static table = 'users'

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

  @column()
  identityNumber: number
  
  @column()
  public workCareer: string
  
  @column()
  public jobs: string

  @column()
  public typeUser: UserEnum

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => Publication, {
    foreignKey: 'authorId'
  })
  public publications: HasMany<typeof Publication>


  @manyToMany(() => Category, {
    pivotTable: 'favorites_categories',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'category_id'
  })
  public favoritesCategories: ManyToMany<typeof Category>

  @manyToMany(() => Publication, {
    pivotTable: 'favorites_publications',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'publication_id'
  })
  public favoritesPublications: ManyToMany<typeof Publication>

  @beforeSave()
  public static async hashPassword(user: User): Promise<void> {
    if(user.$dirty.password)
        user.password = await Hash.make(user.password)
  }
}
