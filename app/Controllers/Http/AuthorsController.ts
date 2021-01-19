import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResourceMethods } from '@ioc:Adonis/Core/Resource'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Author from '@ioc:Adonis/Lucid/Database'
import AuthorValidator from '../../Validators/AuthorValidator'

export default class AuthorsController implements ResourceMethods {

  public async index({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(AuthorValidator)
      const { page = 1, perPage = 10 } = request.params()

      const authors = await Author.query().from("authors").paginate(page, perPage)

      console.log(authors)
      response.ok(authors.toJSON())
    } catch (error) {
      console.log(error)
      response.unprocessableEntity({ status: 422, error: "Unprocessable Entity" })
    }
  }

  public async create(ctx: HttpContextContract): Promise<void> {
  }

  public async store({ request, response }: HttpContextContract): Promise<void> 
  {
    try {
      await request.validate(AuthorValidator)
      
      const [id] = await Author
        .table("authors")
        .returning("id")
        .insert(request.all())

      console.info(id)
      response.ok({ status: 200, data: { id } })

    } catch (error) {
      console.log(error)
      response.unprocessableEntity({ status: 422, error: "Unprocessable Entity" })
    }
  }

  public async show(ctx: HttpContextContract): Promise<void> { }

  public async edit(ctx: HttpContextContract): Promise<void> { }

  public async update(ctx: HttpContextContract): Promise<void> { }

  public async destroy(ctx: HttpContextContract): Promise<void> { }

  public async testDB({ response }: HttpContextContract): Promise<void> {
    const { report, healthy } = await HealthCheck.getReport()

    return healthy ?
      response.ok({ connection: "ok", message: report.lucid.health.message }) :
      response.badRequest({ connection: "error", message: report.lucid.health.message })
  }
}
