import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublicationValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
  })

  public messages = {}
}
