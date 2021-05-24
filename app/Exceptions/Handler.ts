import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { Exception } from '@poppinss/utils'
import Application from '@ioc:Adonis/Core/Application'


export default class ExceptionHandler extends HttpExceptionHandler {

  protected statusJson = {
    400: 'The request does not conform to the expected format. Check the JSON (body | head) being sent, check for missing fields, or fields already in the databases',
    401: 'The authentication data is incorrect',
    403: 'You are trying to access a resource that you do not have permission',
    404: 'You are trying to access a resource that does not exist',
    406: 'The server does not support the data format specified in the header',
    415: 'Cannot process the data sent due to its format',
    422: 'Although the request format is correct, the data violates some business rule',
    500: 'Server error occurred',
    501: 'Server error occurred',
    502: 'Server error occurred',
    504: 'The request took too long and cannot be processed'
  }

  constructor () {
    super(Logger)
  }

  public async handle({ status, message }: Exception,  { response }: HttpContextContract): Promise<void>
  {
    if(status) 
        response
          .status(status)
          .json({status, error: this.statusJson[status] ?? message })
  }

  public async report({message, name, status }: Exception , _: HttpContextContract): Promise<void>
  {
    if(Application.inDev) Logger.warn(`\n${name}: ${message}\nstatus: ${status}\n`)
  }
}
