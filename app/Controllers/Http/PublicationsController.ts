import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import Author from 'App/Models/Author'
import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'
import ByIdValidator from 'App/Validators/ByIdValidator'

import PageValidator from 'App/Validators/PageValidator'
import PublicationUpdateValidator from 'App/Validators/Publications/PublicationUpdateValidator'
import PublicationValidator from 'App/Validators/Publications/PublicationValidator'

export default class PublicationsController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> 
  {
    await request.validate(PageValidator)

    response.ok(
      await Publication
        .query()
        .select('*')
        .paginate(page, perPage)
    )
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(PublicationValidator)

    const { authorId, categoryId } = request.only(['authorId', 'categoryId'])

    const publication = new Publication

    const data = request.except(['categoryId'])

    for (let key in data)
      publication[key] = data[key]

    await (await Author.findOrFail(authorId))
      .related('publications')
      .save(publication);

    await (await Category.findOrFail(categoryId))
      .related('publications')
      .save(publication)

    response.ok(publication)
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)

    response.ok(await Publication.findOrFail(params.id))
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)
    await request.validate(PublicationUpdateValidator)

    const publication = await Publication.findOrFail(params.id)
    const data = request.except(["authorId", "categoryId"])
    const categoryId = request.input("categoryId") ?? null

    for (let key in data)
      publication[key] = data[key]

    if (categoryId)
      (await Category.findOrFail(categoryId))
        .related('publications')
        .save(publication)

    await publication.save()

    response.ok(publication)
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)

    await (await Publication.findOrFail(params.id)).delete()

    response.ok({ deleted: true })
  }
}
