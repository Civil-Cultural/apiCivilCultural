import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Topic from 'App/Models/Topic'
import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import TopicValidator from 'App/Validators/Topics/TopicValidator'
import TopicUpdateValidator from 'App/Validators/Topics/TopicUpdateValidator'


export default class TopicsController  implements ResourceMethods {
  
  public async index({ request, response, params: { page, perPage } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)

      response.ok(
        await Topic
          .query()
          .select("*")
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(TopicValidator)

      response.ok(await Topic.create(Object(request.all())))
    } catch (error) {
      throw new LogicException(error.message,400)
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)

      response.ok(await Topic.findOrFail(id))
    } catch (error) {
      throw new LogicException(error.message,404)
    }
  }

  public async update({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)
      await request.validate(TopicUpdateValidator)

      const props = request.all()
      const topicUpdated = await Topic.findOrFail(id)

      for(let i in props)
        topicUpdated[i] = props[i]  
        
      response.ok(await topicUpdated.save())
    } catch (error) {
      throw new LogicException(error.message,404)
    }
  }

  public async destroy({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  {
    try {

      await request.validate(ByIdValidator)

      await (await Topic.findOrFail(id)).delete()

      response.ok({ deleted: true })
      
    } catch (error) {
      throw new LogicException(error.message,404)
    }
  }

  public async publications({ request, response, params}: HttpContextContract): Promise<void>
  {
    try {
      const {id, page, perPage } = params
      params.type = "string"
      
      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      response.ok(
        await Topic
          .query()
          .preload("publications")
          .where("id", id)
          .paginate(page,perPage)
      )    
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
}
