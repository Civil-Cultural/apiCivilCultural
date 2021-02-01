import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Page } from 'Contracts/controllers'

export default class PageValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public data: Page = this.ctx.params

	public reporter = validator.reporters.api


	public schema = schema.create({
		page: schema.number.optional(
			[rules.unsigned()]
		),
		perPage: schema.number.optional(
			[rules.unsigned()]
		),
	})

	public messages = {
		unsigned: "Value {{ field }} cannot be negative",
		number: " {{ field }} not a number type",
		rules: "Numbers from 1 to 4 are accepted"
	}
}
