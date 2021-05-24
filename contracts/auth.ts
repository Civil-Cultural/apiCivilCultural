/**
 * Contract source: https://git.io/JvyKD
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import UserAuth from 'App/Models/UserAuth'

declare module '@ioc:Adonis/Addons/Auth' {
  
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof UserAuth>,
      config: LucidProviderConfig<typeof UserAuth>,
    },
  }

  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>,
      config: OATGuardConfig<'user'>,
    },
  }
}
