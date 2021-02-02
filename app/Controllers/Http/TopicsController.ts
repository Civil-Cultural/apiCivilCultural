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

      const topics = await Topic
        .query()
        .select("*")
        .paginate(page, perPage)

        response.ok(topics)
      
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(TopicValidator)
      const topic: Topic = await Topic.create(Object(request.all()))

      response.ok(topic)

    } catch (error) {
      throw new LogicException(error.message,400)
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(ByIdValidator)

      const topic:Topic = await Topic.findOrFail(id)

      response.ok(topic)
      
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
      const topicUpdated:Topic = await Topic.findOrFail(id)

      for(let i in props)
        topicUpdated[i] = props[i]  
        
      topicUpdated.save()
      response.ok(topicUpdated)

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

  public async publications(ctx: HttpContextContract): Promise<void>
  {
    
  }
}
