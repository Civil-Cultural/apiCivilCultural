// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

const BASE_DIR: string = "apicvcl"

Route.group((): void => {
  /**
   * @summary Rotas prédefinidas 
  */
  Route
    .resource("author", "AuthorsController")

  Route
    .resource("category", "CategoriesController")

  Route
    .resource("publication", "PublicationsController")

  Route
    .resource("topic", "TopicsController") 

  Route
    .get("health","AuthorsController.testDB")
    .as("author.testDB")
})
  .prefix(BASE_DIR)
  .as("api")