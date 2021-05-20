import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAuth from 'App/Models/UserAuth';
import UserAuthValidator from 'App/Validators/UserAuthValidator';
import LogicException from 'App/Exceptions/LogicException';
import address from 'address'

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { email, password } = request.only(['email', 'password'])
      // Expira em 1 ano
      response.ok(
        await auth
          .use('api')
          .attempt(email, password, { 
              expiresIn: '304days', 
              name: 'token_bearer', 
              ip4_address: address.ip(),
              ip6_address: address.ipv6(),
              user_agent: request.header('User-Agent')
            })
      )
    } catch (error) {
      response.unauthorized({ error: 'Authentication failed' })
    }
  }

  public async logout({ response, auth }: HttpContextContract): Promise<void> {
    try {
      response.ok(await auth.logout())
    } catch (error) {
      throw new LogicException(error, 404);
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(UserAuthValidator)

      response.ok(await UserAuth.create(Object(request.all())))

    } catch (error) {
      throw new LogicException(error.message, 422)
    }
  }
}
