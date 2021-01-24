import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'

export default class PublicationsController implements ResourceMethods {
  public async index(ctx: HttpContextContract): Promise<void> {}

  public async store(ctx: HttpContextContract): Promise<void> {}

  public async show(ctx: HttpContextContract): Promise<void> {}

  public async update(ctx: HttpContextContract): Promise<void> {}

  public async destroy(ctx: HttpContextContract): Promise<void> {}
}
