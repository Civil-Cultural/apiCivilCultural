/**
 * Config source: https://git.io/JvyKy
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  list: {

    api: {
      driver: 'oat',
      tokenProvider: {
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email','password'],
        model: () => import('App/Models/UserAuth'),
        connection: 'pg',
        hashDriver: 'argon'
      },
    },
  },
}

export default authConfig
