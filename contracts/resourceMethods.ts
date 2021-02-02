
declare module '@ioc:Adonis/Core/Resource' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  interface ResourceMethods {
    index(ctx: HttpContextContract): Promise<any>

    store(ctx: HttpContextContract): Promise<any>

    show(ctx: HttpContextContract): Promise<any>
    
    update(ctx: HttpContextContract): Promise<any>

    destroy(ctx: HttpContextContract): Promise<any>

    publications(ctx: HttpContextContract): Promise<any>
  }
}