import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Author from 'App/Models/Author'
import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import AuthorValidator from 'App/Validators/Authors/AuthorValidator'
import AuthorUpdateValidator from 'App/Validators/Authors/AuthorUpdateValidator' 


export default class AuthorsController  implements ResourceMethods {

  public async index({ request, response, params: { page, perPage } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)
      const authors = await Author
        .query()
        .select("*")
        .paginate(page, perPage)

      response.ok(authors)
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(AuthorValidator)

      const author: Author = await Author.create(Object(request.all()))
      
      response.ok(author)
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)

      const author: Author = await Author.findOrFail(params.id)

      response.ok(author)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = "string"

      await request.validate(ByIdValidator)
      await request.validate(AuthorUpdateValidator)

      const props = request.all()
      const authorUpdated:Author = await Author.findOrFail(params.id)
      
      for(let i in props)
        authorUpdated[i] = props[i]    

      authorUpdated.save()
      response.ok(authorUpdated)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = "string"

      await request.validate(ByIdValidator)

      await (await Author.findOrFail(params.id)).delete()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async publications({ request, response, params }: HttpContextContract): Promise<void>  
  {
    try {
      params.type = "string"
      console.info(params.id || null)
      await request.validate(ByIdValidator)
      
      const authorPublications = await (await Author.findOrFail(params.id))
        .related("publications")
        .query()
        .select("*")

      response.ok(authorPublications)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
}
