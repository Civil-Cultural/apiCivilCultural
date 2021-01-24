import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {

  protected statusJson: object = {
    "404": "NOT FOUNT",
    "501": "Serve error",
  }

  constructor () {
    super(Logger)
  }

  public async handle(err: any, { response }: HttpContextContract): Promise<void>
  {
    if(err.status) response.json({code: err.status, mgs: err.body }) 
  }
}
