import { ResourceMethods } from "@ioc:Adonis/Core/Resource"
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'


import User from "App/Models/User"
import { UserEnum } from "Contracts/models"

import PageValidator from "App/Validators/PageValidator"
import ByIdValidator from "App/Validators/ByIdValidator"
import UserValidator from "App/Validators/Users/UserValidator"
import UpdateUserValidator from "App/Validators/Users/UpdateUserValidator"
import UserLoginValidator from "App/Validators/Users/UserLoginValidator"

export default class UsersController implements ResourceMethods {


  public async login({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(UserLoginValidator)

    const { email, password } = request.only(['email', 'password'])

    const user = await User
      .query()
      .where('email', email)
      .firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized({ error: 'Authentication failed' })
    }

    return response.ok(user)
  }

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> 
  {
    await request.validate(PageValidator)

    response.ok(
      await User
        .query()
        .select('*')
        .paginate(page, perPage)
    )
  }

  public async create({ request, response }: HttpContextContract): Promise<void> 
  {
    await request.validate(UserValidator)
    
    response.ok(await User.create(Object({ typeUser:  UserEnum.GUEST, ...request.all()})))
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"

    await request.validate(ByIdValidator)

    response.ok(await User.findOrFail(params.id))
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = "string"

    await request.validate(ByIdValidator)
    await request.validate(UpdateUserValidator)

    const props = request.all()
    const userUpdate = await User.findOrFail(params.id)

    for (let i in props)
      userUpdate[i] = props[i]

    response.ok(await userUpdate.save())
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    params.type = 'string'

    await request.validate(ByIdValidator)

    let user = await User.findOrFail(params.id)

    await user.delete()

    response.ok({ deleted: user.$isDeleted })
  }

  public async publications({request, response, params}: HttpContextContract): Promise<void>
  {
    params.type = 'string'

    await request.validate(ByIdValidator)
    await request.validate(PageValidator)

    const { id, page, perPage } = params

    response.ok(
      await User
        .query()
        .where('id', id)
        .andWhere('type_user', UserEnum.ADMIN)
        .preload('publications')
        .paginate(page, perPage)
      )
  }
}
