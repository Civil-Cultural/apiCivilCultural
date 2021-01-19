import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		nome: schema.string(
			{ escape: true, trim: true},
			[ rules.alpha({ allow: ["space"] }), rules.required()	]
		),
		email: schema.string(
			{ trim: true }, 
			[ rules.email({ ignoreMaxLength: true }), rules.required() ]
		),
		password: schema.string(
			{ trim: true },
			[ rules.required() ]
		),
		description: schema.string(
			{	trim: true }
		),
		work_career: schema.string(
			{	trim: true }
		),
		page: schema.number(
			[ rules.maxLength(4) ]
		),
		perPage: schema.number(
			[ rules.maxLength(4) ]
		),
  })

	public messages = {
		require: "{{ field }} é obrigatório",
		string: "{{ filed}} não é do tipo string",
		number: " {{ field }} não é um tipo number",
		maxLength: "{{ field }} é aceitável no máximo {{ options.maxlength }} números"
	}
}
