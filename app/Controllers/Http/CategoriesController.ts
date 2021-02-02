import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Category from 'App/Models/Category'
import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import CategoryValidator from 'App/Validators/Categories/CategoryValidator'
import CategoryUpdateValidator from 'App/Validators/Categories/CategoryUpdateValidator'

export default class CategoriesController implements ResourceMethods {

  public async index({ request, response, params: { page, perPage } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)

      const categories = await Category
        .query()
        .select("*")
        .paginate(page, perPage)

      response.ok(categories)
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(CategoryValidator)
      const category: Category = await Category.create(Object(request.all()))

      response.ok(category)

    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      let categoryShow: Category = await Category.findOrFail(id)

      response.status(200).json(categoryShow)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async update({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)
      await request.validate(CategoryUpdateValidator)

      const props = request.all()
      const categoryUpdate: Category = await Category.findOrFail(id)
        
      for(let i in props)
          categoryUpdate[i] = props[i]

      categoryUpdate.save()
      response.ok(categoryUpdate)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async destroy({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)

     await (await Category.findOrFail(id)).delete()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async publications(ctx: HttpContextContract): Promise<void>
  {
    
  }
}
