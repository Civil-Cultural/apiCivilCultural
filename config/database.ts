import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {

  connection: Env.get('DB_CONNECTION'),

  connections: {
    
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
      },
      healthCheck: true,
			debug: Application.inDev ? true : false,
    },

  },
  orm: {
  },
}

export default databaseConfig
