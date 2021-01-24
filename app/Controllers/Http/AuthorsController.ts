import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import Author from '@ioc:Adonis/Lucid/Database'

import HandlerError from 'Contracts/HandlerError' 

import AuthorValidator from 'App/Validators/AuthorValidator'
import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import AuthorUpdateValidator from 'App/Validators/AuthorUpdateValidator' 


export default class AuthorsController implements ResourceMethods {

  private handlerError({ error, response }: HandlerError): void 
  {
    if (["syscall", "address", "port"].every(key => key in error))
      response.internalServerError(error.errno)
    else
      response.badRequest({ error })
  }

  public async index({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      const { page = 1, perPage = 10 } = request.params()

      await request.validate(PageValidator)
      const authors = await Author
        .from("authors")
        .paginate(page, perPage)

      response.ok(authors.toJSON())
    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(AuthorValidator)

      const [id] = await Author
        .table("authors")
        .returning("id")
        .insert(request.all())

      response.ok({ data: { id } })

    } catch (error) {
      if (["syscall", "address", "port"].every(key => key in error))
        response.internalServerError(error.errno)
      else
        response.badRequest({ error })
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)

      let authors = await Author
        .from("authors")
        .select("*")
        .where("id", params.id)

      response.status(200).json(authors || {})

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      await request.validate(AuthorUpdateValidator)

      let authorUpdate = await Author
        .from("authors")
        .where("id", params.id)
        .update(request.all())

      response.status(200).json((authorUpdate) ? { updated: true } : { updated: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)

      let authorDestroy = await Author
      .from("authors")
      .where("id", params.id)
      .delete()

      response.status(200).json( (authorDestroy) ? { deleted: true } : { deleted: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }
}
