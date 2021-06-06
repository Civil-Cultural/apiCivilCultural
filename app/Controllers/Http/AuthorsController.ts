import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import Author from 'App/Models/Author'

import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import AuthorValidator from 'App/Validators/Authors/AuthorValidator'
import AuthorUpdateValidator from 'App/Validators/Authors/AuthorUpdateValidator'


export default class AuthorsController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> 
  {
      await request.validate(PageValidator)
      
      response.ok(
        await Author
          .query()
          .select("*")
          .paginate(page, perPage)
      )
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(AuthorValidator)
    response.ok(await Author.create(Object(request.all())))
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)
    
    response.ok(await Author.findOrFail(params.id))
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {

    params.type = "string"

    await request.validate(ByIdValidator)
    await request.validate(AuthorUpdateValidator)

    const props = request.all()
    const authorUpdated = await Author.findOrFail(params.id)

    for (let i in props)
      authorUpdated[i] = props[i]

    response.ok(await authorUpdated.save())

  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)

    await (await Author.findOrFail(params.id)).delete()

    response.ok({ deleted: true })
  }

  public async publications({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    
    await request.validate(ByIdValidator)
    await request.validate(PageValidator)
    
    const { id, page, perPage } = params

    response.ok(
      await Author
        .query()
        .preload("publications")
        .where("id", id)
        .paginate(page, perPage)
    )
  }
}
