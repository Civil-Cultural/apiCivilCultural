import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api
	
  public schema = schema.create({
		name: schema.string.optional(
			{ trim: true }
		),
		email: schema.string.optional(
			{ trim: true }
		),
		password: schema.string.optional(
			{ trim: true }
		),
		language: schema.string.optional(
			{ trim: true }
		),
		country: schema.string.optional(
			{ trim: true }
		)
  })

  public messages = {
		string: '{{ field }} not a {{ rule }}'
	}
}
