import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Category from 'App/Models/Category'
import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import CategoryValidator from 'App/Validators/Categories/CategoryValidator'
import CategoryUpdateValidator from 'App/Validators/Categories/CategoryUpdateValidator'

export default class CategoriesController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(PageValidator)

      response.ok(
        await Category
          .query()
          .select('*')
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(CategoryValidator)

      response.ok(await Category.create(Object(request.all())))
    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)

      response.ok(await Category.findOrFail(id))
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async update({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)
      await request.validate(CategoryUpdateValidator)

      const props = request.all()
      const categoryUpdate = await Category.findOrFail(id)

      for (let i in props)
        categoryUpdate[i] = props[i]

      response.ok(await categoryUpdate.save())
    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async destroy({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)

      await (await Category.findOrFail(id)).delete()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async publications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params

      response.ok(
        await Category
          .query()
          .preload('publications')
          .where('id', id)
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
}
