import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import Categories from '@ioc:Adonis/Lucid/Database'

import HandlerError from 'Contracts/handlerError'

import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import CategoryValidator from 'App/Validators/Categories/CategoryValidator'
import CategoryUpdateValidator from 'App/Validators/Categories/CategoryUpdateValidator'

export default class CategoriesController implements ResourceMethods {

  private handlerError({ error, response }: HandlerError): void 
  {
    if (["syscall", "address", "port"].every(key => key in error))
      response.internalServerError(error.errno)
    else
      response.badRequest({ error })
  }

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)
      const categories = await Categories
        .from("categories")
        .paginate(page, perPage)

      response.ok(categories.toJSON())
    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(CategoryValidator)
      const [id] = await Categories
        .table("categories")
        .returning("id")
        .insert(request.all())

      response.ok({ data: { id } })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      let categoryShow = await Categories
        .from("categories")
        .select("*")
        .where("id", params.id)

      response.status(200).json(categoryShow || {})

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)
      await request.validate(CategoryUpdateValidator)

      const categoryUpdate = await Categories
        .from("categories")
        .where("id", params.id)
        .update(request.all())

      response.status(200).json( categoryUpdate ? { updated: true }: { updated: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  { 
    try {
      await request.validate(ByIdValidator)

      const categoryUpdate = await Categories
        .from("categories")
        .where("id", params.id)
        .delete()

      response.status(200).json( categoryUpdate ? { deleted: true }: { deleted: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }
}
