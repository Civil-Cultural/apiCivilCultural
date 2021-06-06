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

const URLSFavorites: PropsUrl[] = [
  { url: 'categories', controller: 'FavoritesController', params: 'categoryId' },
  { url: 'publications', controller: 'FavoritesController', params: 'publicationId' }
]

Route.group((): void => {
  /**
   * @summary Rotas prédefinidas 
  */
  for (let { url, controller } of URLS) {

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
        .get(`/${url}/:id/publications/:page/:perPage`, `${controller}.publications`)
        .as(`${url}.publications`)
  }

  for (let { url, controller, params } of URLSFavorites) {
    let urlMatch = url.replace(/\b\w{1}/, (m) => m.toUpperCase())
    params = Array.isArray(params) ? params.join('\/:') : params

    Route
      .get(`/users/:id/${url}/:page/:perPage`, `${controller}.index${urlMatch}`)
      .as(`users.index${urlMatch}`)

    Route
      .post(`/users/${url}`, `${controller}.store${urlMatch}`)
      .as(`users.store${urlMatch}`)

    Route
      .get(`/users/${url}/:userId/:${params}`, `${controller}.show${urlMatch}`)
      .as(`users.show${urlMatch}`)

    Route
      .delete(`/users/${url}/:userId/:${params}`, `${controller}.remove${urlMatch}`)
      .as(`users.remove${urlMatch}`)

  }

  /* --- --- --- --- --- */

  /**
   * @summary Rotas da autenticações
   */

  Route
    .post('/users/login','UsersController.login')
    .as('users.login')

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


Route
  .post('/auth/login', 'AuthController.login')
  .prefix(BASE_PREFIX)
  .as(`${BASE_ALIAS}.auth.login`)

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