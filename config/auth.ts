import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  list: {
    api: {
      driver: 'oat',
      tokenProvider: {
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'database',
        identifierKey: 'id',
        uids: ['email'],
        usersTable: "users_auth",
      },
    },
  },
}

export default authConfig
