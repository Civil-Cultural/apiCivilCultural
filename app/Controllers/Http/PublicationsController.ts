import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import LogicException from 'App/Exceptions/LogicException'

import Author from 'App/Models/Author'
import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'
import Topic from 'App/Models/Topic'
import ByIdValidator from 'App/Validators/ByIdValidator'

import PageValidator from 'App/Validators/PageValidator'
import PublicationUpdateValidator from 'App/Validators/Publications/PublicationUpdateValidator'
import PublicationValidator from 'App/Validators/Publications/PublicationValidator'

export default class PublicationsController implements ResourceMethods {

  public async index({ request, response, params: { page, perPage } }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PageValidator)

      response.ok(
        await Publication
          .query()
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(PublicationValidator)

      const { authorId, categoryId, topicId } = request.only(["authorId", "categoryId", "topicId"])

      const publication = new Publication

      const data = request.except(["authorId", "categoryId", "topicId"])

      for (let key in data)
        publication[key] = data[key]

      await (await Author.findOrFail(authorId))
        .related("publications")
        .save(publication);

      await (await Category.findOrFail(categoryId))
        .related("publications")
        .save(publication);

      await (await Topic.findOrFail(topicId))
        .related("publications")
        .save(publication)

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

      response.ok(await Publication.findOrFail(params.id))

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)
      await request.validate(PublicationUpdateValidator)

      const publication = await Publication.findOrFail(params.id)
      const data = request.except(["authorId", "categoryId", "topicId"])
      const categoryId = request.input("categoryId") ?? null
      const topicId = request.input("topicId") ?? null

      for (let key in data) 
        publication[key] = data[key]

      if (publication?.authorId)
        await (await Author.findOrFail(publication.authorId))
          .related("publications")
          .save(publication);

      if (categoryId)
        await (await Category.findOrFail(categoryId))
          .related("publications")
          .save(publication)

      if (topicId)
        await (await Topic.findOrFail(topicId))
          .related("publications")
          .save(publication)


      response.ok(publication)

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = "string"
      await request.validate(ByIdValidator)

      await (await Publication.findOrFail(params.id)).delete()

      response.ok({ deleted: true })
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }

  public async publications(_: HttpContextContract): Promise<void> {}
}
