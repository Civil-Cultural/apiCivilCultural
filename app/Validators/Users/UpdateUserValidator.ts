import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api
	
  public schema = schema.create({
		name: schema.string.optional({ trim: true }),

		email: schema.string.optional(
			{ trim: true }, 
			[ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]
		),

		password: schema.string.optional({ trim: true }),

		language: schema.string.optional({ trim: true }),

		country: schema.string.optional({ trim: true }),
		
		workCareer: schema.string.optional({ trim: true }),

		jobs: schema.string.optional({ trim: true }),
  })

  public messages = {
		string: '{{ field }} not a {{ rule }}'
	}
}
