import { Exception } from '@poppinss/utils'
import Application from '@ioc:Adonis/Core/Application'

type errorStatusDB = {
  errno: number,
  code: string,
  syscall: string,
  address: string,
  port: number | string
}

export default class LogicException extends Exception {

  constructor(
    errorMsg: string | object,
    status?: number | undefined,
    code?: string | undefined
  ) {
    if (typeof errorMsg == "object") {
      if (["errno", "code", "syscall", "address","port"].every( v => v in <errorStatusDB>errorMsg))
          errorMsg = errorMsg.code
      errorMsg = (new String(errorMsg)).toString()
    }

    if(Application.inDev)
        console.info({status, code, error: errorMsg})

    super(errorMsg, status, code)
  }
}
