import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Publication from 'App/Models/Publication'
import { StatePublicationsEnum, UserEnum } from 'Contracts/models'


import ByIdValidator from 'App/Validators/ByIdValidator'
import PageValidator from 'App/Validators/PageValidator'
import PublicationValidator from 'App/Validators/Publications/PublicationValidator'
import UpdatePublicationValidator from 'App/Validators/Publications/UpdatePublicationValidator'

export default class PublicationsController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> {
    await request.validate(PageValidator)

    response.ok(
      await Publication
        .query()
        .select('*')
        .paginate(page, perPage)
    )
  }

  public async create({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(PublicationValidator)
    
    let publication = <Publication>{}
    
    const data = request.except(['categories','authorId'])

    const categories = request.input('categories', null)

    const authorId = request.input('authorId')

    for (let key in data)
      publication[key] = data[key];

    publication.statePublication = StatePublicationsEnum.VOTES


    let user = await User
      .query()
      .where('id', authorId)
      .andWhere('type_user', UserEnum.ADMIN)
      .firstOrFail()

    publication = await user
      .related('publications')
      .create(publication)

    if (categories)
      for (let category of categories) {
        await (await Category.findOrFail(category))
          .related('publications')
          .attach([publication.id])
      }

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
    await request.validate(UpdatePublicationValidator)

    const data = request.except(['categories'])

    let publication = await Publication.findOrFail(params.id)

    const categories = request.input("categories", null)

    for (let key in data)
      publication[key] = data[key];


    publication = await publication.save()

    if (categories)
      for (let category of categories) {
        await (await Category.findOrFail(category))
          .related('publications')
          .attach([publication.id])
      }


    response.ok(publication)
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"
    await request.validate(ByIdValidator)

    let publication = await Publication.findOrFail(params.id)

    await publication.delete()

    response.ok({ deleted: publication.$isDeleted })
  }
}
