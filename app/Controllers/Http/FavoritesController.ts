import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Publication from 'App/Models/Publication'
import Category from 'App/Models/Category'

import PageValidator from "App/Validators/PageValidator"
import ByIdValidator from "App/Validators/ByIdValidator"
import FavoritePublicationValidator from 'App/Validators/Favorites/FavoritePublicationValidator'
import FavoriteCategoryValidator from 'App/Validators/Favorites/FavoriteCategoryValidator'
import FavoriteParamValidator from 'App/Validators/Favorites/FavoriteParamValidator'

export default class FavoritesController {

  public async indexCategories({ request, response, params }: HttpContextContract): Promise<void>
  {
    params.type = 'string'

    await request.validate(ByIdValidator)
    await request.validate(PageValidator)

    const { id, page = 1, perPage = 10 } = params


    response.ok(
      await User
        .query()
        .preload('favoritesCategories')
        .where('id', id)
        .paginate(page, perPage)
    )
  }

  public async addCategories({ request, response }: HttpContextContract): Promise<void>
  {
    await request.validate(FavoriteCategoryValidator)

    const { categoryId, userId } = request.only(['categoryId', 'userId'])

    const user: User = await User.findOrFail(userId)

    await user
      .related('favoritesCategories')
      .save(await Category.findOrFail(categoryId))


    response.ok(
      await User
        .query()
        .preload(
          'favoritesCategories',
          q => q.wherePivot('category_id', categoryId)
        )
        .first()
    )
  }

  public async showCategories({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'favoritesCategories'

    await request.validate(FavoriteParamValidator)

    response.ok(
      await User
        .query()
        .where('id', params.userId)
        .whereDoesntHave(
          'favoritesCategories',
          q => q.wherePivot('category_id', params.categoryId)
        )
        .firstOrFail()
    )
  }

  public async removeCategories({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'favoritesCategories'

    await request.validate(FavoriteParamValidator)


    const user: User = await User.findOrFail(params.userId)

    await user.related('favoritesCategories').detach([params.categoryId]);

    response.ok({ deleted: true })
  }


  public async indexPublications({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'string'

    await request.validate(ByIdValidator)
    await request.validate(PageValidator)

    const { id, page = 1, perPage = 10 } = params

    response.ok(
      await User
        .query()
        .preload('favoritesPublications')
        .where('id', id)
        .paginate(page, perPage)
    )
  }

  public async addPublications({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(FavoritePublicationValidator)

    const { userId, publicationId } = request.only(['userId', 'publicationId'])

    const user: User = await User.findOrFail(userId)

    await user
      .related('favoritesPublications')
      .save(await Publication.findOrFail(publicationId))


    response.ok(
      await User
        .query()
        .preload(
          'favoritesPublications',
          q => q.wherePivot('publication_id', publicationId)
        )
        .first()
    )
  }

  public async showPublications({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'favoritesPublications'

    await request.validate(FavoriteParamValidator)

    response.ok(
      await User
        .query()
        .where('id', params.userId)
        .whereHas(
          'favoritesPublications',
          q => q.wherePivot('publication_id', params.publicationId)
        )
        .firstOrFail()

    )
  }

  public async removePublications({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'favoritesPublications'

    await request.validate(FavoriteParamValidator)

    const user = await User.findOrFail(params.userId)

    await user.related('favoritesPublications').detach([params.publicationId]);


    response.ok({ deleted: user.$isDeleted })
  }
}
