import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

type PropsUrl = {url: string; controller: string; }

const BASE_DIR: string = "apicvcl"
const BASE_ALIAS: string = "api"


const URLS: Array<PropsUrl> = [
  {url: "authors", controller: "AuthorsController"},
  {url: "categories", controller: "CategoriesController"},
  {url: "publications", controller: "PublicationsController"},
  {url: "topics", controller: "TopicsController"},
]

Route.group((): void => 
{
  
  /**
   * @summary Rotas prédefinidas 
  */
  for(let prop of URLS) {
    const { url, controller } = prop
    Route
      .get(`/${url}/:page/:perPage`, `${controller}.index`)
      .as(`${url}.index`)
    Route
      .post(`/${url}`, `${controller}.store`)
      .as(`${url}.store`)
    Route
      .get(`/${url}/:id`, `${controller}.show`)
      .as(`${url}.show`)
    Route
      .put(`/${url}/:id`, `${controller}.update`)
      .as(`${url}.update`)
    Route
      .delete(`/${url}/:id`, `${controller}.destroy`)
      .as(`${url}.destroy`)
  }
    /**
     * @summary Rota de teste de conexão
     */
  Route
    .get("/", async ({ response }: HttpContextContract ): Promise<void> =>  response.json({ status: "ok"}))
    .as("status")
  Route
    .get("health", async ({ response }: HttpContextContract): Promise<void> => 
    {
      const { report, healthy } = await HealthCheck.getReport()

      healthy ?
        response.ok({ connection: "ok", message: report.lucid.health.message }) :
        response.badRequest({ connection: "error", message: report.lucid.health.message })
    })
    .as("author.testDB")
})
  .prefix(BASE_DIR)
  .as(BASE_ALIAS)