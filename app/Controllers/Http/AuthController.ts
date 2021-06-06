import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAuth from 'App/Models/UserAuth';
import UserAuthValidator from 'App/Validators/UserAuthValidator';
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
      response.unauthorized({ error: 'Unauthenticated' })
    }
  }

  public async logout({ response, auth }: HttpContextContract): Promise<void> 
  {
    response.ok(await auth.logout())
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {    
    await request.validate(UserAuthValidator)
    response.ok(await UserAuth.create(Object(request.all())))

  }
}
