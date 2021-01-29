import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'


import Category from 'App/Models/Category'
import LogicException from 'App/Exceptions/LogicException'
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
      throw new LogicException(error)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(CategoryValidator)
      const category: Category = await Category.create(Object(request.all()))

      response.ok(category)

    } catch (error) {
      throw new LogicException(error, 400)
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      let categoryShow: Category = await Category.findOrFail(params.id)

      response.status(200).json(categoryShow)

    } catch (error) {
      throw new LogicException(error, 404)
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)
      await request.validate(CategoryUpdateValidator)

      const props = request.all()
      const categoryUpdate: Category = await Category.findOrFail(params.id)
        
      for(let i in props)
          categoryUpdate[i] = props[i]

      categoryUpdate.save()
      response.ok(categoryUpdate)

    } catch (error) {
      throw new LogicException(error, 404)
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)

     await (await Category.findOrFail(params.id)).delete()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error, 404)
    }
  }
}
