import { HttpContextContract, } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { PropsUrl } from '@ioc:Adonis/Core/Route'

const BASE_PREFIX: string = 'apicvcl'
const BASE_ALIAS: string = 'api'

console.clear()

const URLS: PropsUrl[] = [
  { url: 'authors', controller: 'AuthorsController' },
  { url: 'categories', controller: 'CategoriesController' },
  { url: 'publications', controller: 'PublicationsController' },
  { url: 'users', controller: 'UsersController' }
]

Route.group((): void => {
  /**
   * @summary Rotas prédefinidas 
  */
  for (let prop of URLS) {
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

    if (!['publications', 'users'].includes(url))
      Route
        .get(`/${url}/:id/publications/:page?/:perPage?`, `${controller}.publications`)
        .as(`${url}.publications`)
  }
  // --- --- --- --- ---

  Route
    .get('/users/:id/categories/:page?/:perPage?', 'FavoritesController.indexCategories')
    .as('users.indexCategories')

  Route
    .post('/users/categories', 'FavoritesController.storeCategories')
    .as('users.storeCategories')

  Route
    .delete('/users/:id/categories/:categoryId', 'FavoritesController.removeCategories')
    .as('users.removeCategories')


  Route
    .get('/users/:id/publications/:page?/:perPage?', 'FavoritesController.indexPublications')
    .as('users.indexPublications')

  Route
    .post('/users/publications', 'FavoritesController.storePublications')
    .as('users.storePublications')

  Route
    .delete('/users/:id/publications/:publicationId', 'FavoritesController.removePublications')
    .as('users.removePublications')


  /**
   * Rotas da autenticação do token
   */
  Route
    .post('/auth', 'AuthController.store')
    .as('auth.store')

  Route
    .get('/auth', 'AuthController.logout')
    .as('auth.logout')

})
  .prefix(BASE_PREFIX)
  .as(BASE_ALIAS)
  .middleware('auth')


/**
 * @summary Rota de teste de conexão
 */
Route
  .get('/status', async ({ response }: HttpContextContract): Promise<void> => {
    const { healthy, report } = await HealthCheck.getReport()

    healthy ?
      response.ok({ connection: 'ok', message: report.lucid.health.message }) :
      response.serviceUnavailable({ connection: 'error', message: report.lucid.health.message })
  })
  .prefix(BASE_PREFIX)
  .as(`${BASE_ALIAS}.auth.status`)

Route
  .post('/auth/login', 'AuthController.login')
  .prefix(BASE_PREFIX)
  .as(`${BASE_ALIAS}.auth.login`)