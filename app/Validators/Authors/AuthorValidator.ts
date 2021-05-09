import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string(
			{ trim: true }
		),
		email: schema.string(
			{ trim: true },
			[rules.email({ ignoreMaxLength: true })]
		),
		password: schema.string(
			{ trim: true },
		),
		description: schema.string.optional(
			{ trim: true }
		),
		workCareer: schema.string.optional(
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
		required: "{{ field }} required field",
		string: "{{ field }} not a string",
	}
}
