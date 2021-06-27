import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { Exception } from '@poppinss/utils'
import Application from '@ioc:Adonis/Core/Application'

type StatusCodeProps = {
  status: number; 
  error: string
}


export default class ExceptionHandler extends HttpExceptionHandler {

  protected static statusJson = {
    400: 'The request does not conform to the expected format. Check the JSON (body | head) being sent, check for missing fields, or fields already in the databases',
    401: 'The authentication data is incorrect',
    403: 'You are trying to access a resource that you do not have permission',
    404: 'You are trying to access a resource that does not exist',
    406: 'The server does not support the data format specified in the header',
    415: 'Cannot process the data sent due to its format',
    422: 'The request does not conform to the expected format. Check the JSON (body | head) being sent, check for missing fields, or fields already in the databases',
    500: 'Server error',
    504: 'The request took too long and cannot be processed'
  }

  constructor () {
    super(Logger)
  }

  public async handle(ex: Exception,  { response }: HttpContextContract): Promise<void>
  {
    let statusProps = await this.setStatusCode(ex.code)
        
    response
      .status(statusProps.status)
      .json({ status: statusProps.status, error: statusProps.error })
  }

  private async setStatusCode(code: any): Promise<StatusCodeProps>
  {
    let statusCodeProps = {} as StatusCodeProps 

    switch(code) {
      case 'E_VALIDATION_FAILURE': 
        statusCodeProps.status = 422; 
        statusCodeProps.error =  ExceptionHandler.statusJson[422]
        break;
      case 'E_ROUTE_NOT_FOUND':
        statusCodeProps.status = 404; 
        statusCodeProps.error = ExceptionHandler.statusJson[404]
        break;
      case 'E_ROW_NOT_FOUND':
        statusCodeProps.status = 404,
        statusCodeProps.error = 'Row not found'
        break;
      case 'E_UNAUTHORIZED_ACCESS':
        statusCodeProps.status = 401
        statusCodeProps.error = ExceptionHandler.statusJson[401]
        break;
      default:
        statusCodeProps.status = 500
        statusCodeProps.error = ExceptionHandler.statusJson[500]
        break;
    }

    return statusCodeProps
  }Exception

  public async report({message, name, status, stack  }: Exception  , _: HttpContextContract): Promise<void>
  {
    if(Application.inDev)  {
      Logger.error(`\n${name}: ${message}\nstatus: ${status}`);

      Logger.info(`${stack ?? ''}`)
    }
  }
}
