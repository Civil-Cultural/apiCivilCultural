/**
 * Contract source: https://git.io/JvyKD
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */
declare module '@ioc:Adonis/Addons/Auth' {
 
  interface ProvidersList {
    
    user: {
      implementation: DatabaseProviderContract<DatabaseProviderRow>,
      config: DatabaseProviderConfig,
    },
  }

  interface GuardsList {

    api: {
      implementation: OATGuardContract<'user', 'api'>,
      config: OATGuardConfig<'user'>,
    },
  }
}
