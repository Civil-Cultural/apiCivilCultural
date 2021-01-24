import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor (protected ctx: HttpContextContract) {
	}
	
	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string(
			{ trim: true }
		),
		description: schema.string(
			{ trim: true }
		)
  })

  public messages = {
		required: "{{ field }} required field",
		string: "{{ field }} not a string",
	}
}