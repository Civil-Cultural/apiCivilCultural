import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'
import Publication from 'App/Models/Publication'
import PageValidator from 'App/Validators/PageValidator'
import PublicationValidator from 'App/Validators/Publications/PublicationValidator'
import PublicationUpdateValidator from 'App/Validators/Publications/PublicationUpdateValidator'


export default class PublicationsController implements ResourceMethods {
  
  public async index({ request, response, params: { page, perPage} }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)

      const publications = await Publication
        .query()
        .select("*")
        .paginate(page, perPage)
        
      response.ok(publications)
    } catch (error) {
      throw new LogicException(error)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PublicationValidator)

      const publication: Publication = await Publication.create(Object(request.all()))

      response.ok(publication)
      
    } catch (error) {
      throw new LogicException(error, 400)
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {

      const publication: Publication = await Publication.firstOrFail(params.id)

      response.ok(publication)
      
    } catch (error) {
      throw new LogicException(error, 404)
    }
  }

  public async update({ request, response }: HttpContextContract): Promise<void>
  {
    try {
      
    } catch (error) {
      throw new LogicException(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void>
  {
    try {
      
    } catch (error) {
      throw new LogicException(error)
    }
  }
}
