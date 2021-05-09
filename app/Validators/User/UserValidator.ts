import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

  public schema = schema.create({
		name: schema.string(
			{ trim: true }
		),
		email: schema.string(
			{ trim: true }
		),
		password: schema.string(
			{ trim: true }
		),
		language: schema.string(
			{ trim: true }
		),
		country: schema.string(
			{ trim: true }
		)
  })

  public messages = {
		required: '{{ field }} required field',
		string: '{{ field }} not a {{ rule }}'
	}
}
