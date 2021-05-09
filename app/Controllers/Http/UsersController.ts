import { ResourceMethods } from "@ioc:Adonis/Core/Resource";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogicException from "App/Exceptions/LogicException";
import User from "App/Models/User";
import PageValidator from "App/Validators/PageValidator";
import UserValidator from "App/Validators/User/UserValidator";
import ByIdValidator from "App/Validators/ByIdValidator";
import UserUpdateValidator from "App/Validators/User/UserUpdateValidator";


export default class UsersController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 }}: HttpContextContract): Promise<void>
  {
    try {
      await request.validate(PageValidator)

      response.ok(
        await User
          .query()
          .select('*')
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void>
  {
    try {
      await request.validate(UserValidator)
      response.ok(await User.create(Object(request.all())))

    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {
      params.type = "string"

      await request.validate(ByIdValidator)

      response.ok( await User.findOrFail(params.id))
    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
  
  public async update({ request, response, params }: HttpContextContract): Promise<void>
  {
    try {
      params.type = "string"

      await request.validate(ByIdValidator)
      await request.validate(UserUpdateValidator)

      const props = request.all()
      const userUpdate = await User.findOrFail(params.id)

      for(let i in props)
        userUpdate[i] = props[i]

      response.ok(await userUpdate.save())
    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> 
  {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)

      await(await User.findOrFail(params.id)).delete()

      response.ok({ deleted: true })

    } catch (error) {
      throw new LogicException(error.message, 404)
    }
  }
}
