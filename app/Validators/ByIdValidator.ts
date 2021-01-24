import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ByIdValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public data: any = this.ctx.params
	public reporter = validator.reporters.api

	public schema  = schema.create({
		id: schema.string({trim: true, escape: true},[rules.required()])
	})

	public messages = {
		required: "Required field",
		unsigned: "Value {{ field }} cannot be negative",
		number: "{{ field }} not a number type"
	}
}
