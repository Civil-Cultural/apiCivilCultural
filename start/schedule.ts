import sc from 'node-schedule'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

// A cada mês do dia 1 é executado essa tarefa
sc.scheduleJob('* * * 1 * *', async () => {
  try{
    let date = (new Date).toLocaleDateString('pt-BR').split('/').reverse().join('-')

    await Database
      .rawQuery('DELETE FROM api_tokens WHERE expires_at::date < ?',[ date ])
      .debug(Application.inDev ? true : false)
      
  }catch(ex) {
    console.error(ex)
  }
})