import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormatBody {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>) {
    let newBody: object = {}
    
    Object.entries(request.all()).map(v => {
      v[1] = /^\d+$/.test(v[1]) ? Number(v[1]) : v[1]
      let match = v[0].match(/_(.){1}/)?.shift()

      match = match ? v[0].replace(/_(.){1}/, match?.substring(1,match?.length).toUpperCase()) : v[0]
      
      newBody[match] = v[1]
    })

    request.updateBody(newBody)
    await next()
  }
}
