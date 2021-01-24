import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorUpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string.optional(
			{ trim: true }
		),
		email: schema.string.optional(
			{ trim: true },
			[rules.email({ ignoreMaxLength: true })]
		),
		password: schema.string.optional(
			{ trim: true },
		),
		description: schema.string.optional(
			{ trim: true }
		),
		work_career: schema.string.optional(
			{ trim: true }
		),

	})

	public messages = {
		required: "{{ field }} Required field",
		string: "{{ field }} Not a string",
		alpha: "{{ field }} can only contain letters and spaces"
	}
}
