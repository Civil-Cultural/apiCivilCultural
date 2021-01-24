import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

const BASE_DIR: string = "apicvcl"

Route.group((): void => {
  /**
   * @summary Rotas prédefinidas 
  */
  Route
    .resource("author", "AuthorsController")
    .apiOnly()

  Route
    .resource("category", "CategoriesController")
    .apiOnly()

  Route
    .resource("publication", "PublicationsController")
    .apiOnly()

  Route
    .resource("topic", "TopicsController") 
    .apiOnly()

    /**
     * @summary Rota de teste de conexão
     */
  Route
    .get("health", async ({ response }: HttpContextContract): Promise<void> => {
    const { report, healthy } = await HealthCheck.getReport()

    healthy ?
      response.ok({ connection: "ok", message: report.lucid.health.message }) :
      response.badRequest({ connection: "error", message: report.lucid.health.message })
  })
    .as("author.testDB")
})
  .prefix(BASE_DIR)
  .as("api")