import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Author from 'App/Models/Author'
import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'
import Topic from 'App/Models/Topic'
import ByIdValidator from 'App/Validators/ByIdValidator'

import PageValidator from 'App/Validators/PageValidator'
import PublicationValidator from 'App/Validators/Publications/PublicationValidator'

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
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PublicationValidator)

      const { authorId, categoryId, topicId } = request.only(["authorId","categoryId","topicId"])

      const author = await Author.findOrFail(authorId)
      const category = await Category.findOrFail(categoryId)
      const topic = await Topic.findOrFail(topicId)
      const publication = new Publication

      const data = request.except(["authorId","categoryId","topicId"])
      for(let key in data) 
        publication[key] = data[key]

      
      await author.related("publications").save(publication);
      await category.related("publications").save(publication);
      await topic.related("publications").save(publication)

      response.ok(publication)
      
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)

      const publication: Publication = await Publication.firstOrFail(params.id)

      response.ok(publication)
      
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)
      
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async publications(ctx: HttpContextContract): Promise<void>  
  {
    ctx.logger.debug("método abstrato")
  }
}
