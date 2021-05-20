import sc from 'node-schedule'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'

// A cada mês do dia 1 é executado essa tarefa
sc.scheduleJob('* * * 1 * *', async () => {
  try{
    let date = format(new Date, 'yyyy-MM-dd', { locale: ptBR })

    await Database
      .rawQuery('DELETE FROM api_tokens WHERE expires_at::date < ?',[ date ])
      .debug(Application.inDev ? true : false)
      
  }catch(ex) {
    console.error(ex)
  }
})