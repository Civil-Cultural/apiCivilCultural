import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogicException from "App/Exceptions/LogicException";
import PageValidator from "App/Validators/PageValidator";
import ByIdValidator from "App/Validators/ByIdValidator";
import User from 'App/Models/User';
import FavoritePublicationValidator from 'App/Validators/Favorites/FavoritePublicationValidator';
import FavoriteCategoryValidator from 'App/Validators/Favorites/FavoriteCategoryValidator';
import FavoriteParamValidator from 'App/Validators/Favorites/FavoriteParamValidator';
import Publication from 'App/Models/Publication';
import Category from 'App/Models/Category';

export default class FavoritesController {

  public async indexCategories({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params


      response.ok(
        await User
          .query()
          .preload('favoriteCategories')
          .where('id', id)
          .paginate(page, perPage)
      )

    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async storeCategories({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(FavoriteCategoryValidator)

      const { categoryId, userId } = request.only(['categoryId', 'userId'])

      const user: User = await User.findOrFail(userId)

      await user
      .related('favoriteCategories')
      .save(await Category.findOrFail(categoryId))


    response.ok(
      await User
        .query()
        .preload(
          'favoriteCategories',
          q => q.wherePivot('category_id', categoryId)
        )
        .firstOrFail()
    )

    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async removeCategories({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoriteCategories'

      await request.validate(FavoriteParamValidator)

      const user: User = await User.findOrFail(params.id)

      await user.related('favoriteCategories').detach([ params.categoryId ]);

      await User
      .query()
      .preload(
        'favoriteCategories',
        q => q.wherePivot('category_id', params.categoryId)
      )
      .first()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async indexPublications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params

      response.ok(
        await User
          .query()
          .preload('favoritePublications')
          .where('id', id)
          .paginate(page, perPage)
      )

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async storePublications({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(FavoritePublicationValidator)

      const { publicationId, userId } = request.only(['publicationId', 'userId'])

      const user: User = await User.findOrFail(userId)

      await user
        .related('favoritePublications')
        .save(await Publication.findOrFail(publicationId))


      response.ok(
        await User
          .query()
          .preload(
            'favoritePublications',
            q => q.wherePivot('publication_id', publicationId)
          )
          .firstOrFail()
      )

    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async removePublications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoritePublications'

      await request.validate(FavoriteParamValidator)

      const user: User = await User.findOrFail(params.id)

      await user.related('favoritePublications').detach([ params.publicationId ]);

      await User
      .query()
      .preload(
        'favoritePublications',
        q => q.wherePivot('publication_id', params.publicationId)
      )
      .first()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
}
