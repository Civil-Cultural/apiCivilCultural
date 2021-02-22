import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAuth from 'App/Models/UserAuth';
import UserAuthValidator from 'App/Validators/UserAuthValidator';
import LogicException from 'App/Exceptions/LogicException';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { email, password } = request.only(["email", "password"])
      response.ok(await auth.attempt(email, password, { expiresIn: "30 days" }))

    } catch (error) {
      response.unauthorized({ error: "Authentication failed" })
    }
  }

  public async logout({ response, auth }: HttpContextContract): Promise<void> {
    try {
      response.ok(await auth.logout())
    } catch (error) {
      throw new LogicException(error);
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(UserAuthValidator)

      response.ok(await UserAuth.create(Object(request.all())))

    } catch (error) {
      throw new LogicException(error.message, 400)
    }
  }
}
