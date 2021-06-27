import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string({ trim: true }),

		email: schema.string(
			{ trim: true }, 
			[ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]
		),

		password: schema.string({ trim: true }),

		language: schema.string({ trim: true }),

		country: schema.string({ trim: true }),

		identityNumber: schema.number([ rules.unsigned() ]),

		workCareer: schema.string({ trim: true }),

		jobs: schema.string({ trim: true })

	})

	public messages = {
		required: '{{ field }} required field',
		string: '{{ field }} not a {{ rule }}'
	}
}
