import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryUpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string.optional(
			{ trim: true }
		),
		description: schema.string.optional(
			{ trim: true }
		)
  })

  public messages = {
		string: "{{ field }} not a string"
	}
}
