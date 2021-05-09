import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import Application from '@ioc:Adonis/Core/Application'
import { errorStatusDB } from '@ioc:Adonis/Core/Exception'

export default class LogicException extends Exception {

  constructor(
    errorMsg: string | errorStatusDB,
    status?: number | undefined,
    code?: string | undefined
  ) {
    if (typeof errorMsg == 'object') {
      if (['errno', 'code', 'syscall', 'address','port'].every( v => v in <errorStatusDB>errorMsg))
          errorMsg = errorMsg.code

      errorMsg = (new String(errorMsg)).toString()
    }

    if(Application.inDev)
        console.info({ status, code, error: errorMsg })

    super(errorMsg, status, code)
  }

  public async handle({ message, code }: this, { response }: HttpContextContract): Promise<void>
  {
    response.status(Number(code)).json({ error: message});
  }

}
