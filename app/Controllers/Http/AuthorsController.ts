import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import Authors from '@ioc:Adonis/Lucid/Database'

import HandlerError from 'Contracts/handlerError' 

import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import AuthorValidator from 'App/Validators/Authors/AuthorValidator'
import AuthorUpdateValidator from 'App/Validators/Authors/AuthorUpdateValidator' 


export default class AuthorsController implements ResourceMethods {

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
      const authors = await Authors
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

      const [id] = await Authors
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

      const authorsShow = await Authors
        .from("authors")
        .select("*")
        .where("id", params.id)

      response.status(200).json(authorsShow || {})

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      await request.validate(AuthorUpdateValidator)

      const authorUpdate = await Authors
        .from("authors")
        .where("id", params.id)
        .update(request.all())

      response.status(200).json(authorUpdate ? { updated: true } : { updated: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)

      const authorDestroy = await Author
      .from("authors")
      .where("id", params.id)
      .delete()

      response.status(200).json( (authorDestroy) ? { deleted: true } : { deleted: false })

    } catch (error) {
      this.handlerError({ error, response })
    }
  }
}
