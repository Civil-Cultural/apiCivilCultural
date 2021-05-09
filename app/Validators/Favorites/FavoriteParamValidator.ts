import { schema , rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogicException from 'App/Exceptions/LogicException'
import { FavoriteCategoriesParam, FavoritePublicationsParam } from 'Contracts/validators'

export default class FavoriteParamValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public data: FavoriteCategoriesParam | FavoritePublicationsParam = this.ctx.params

	public reporter = validator.reporters.api
	
  public schema = schema.create(this.typeFavoriteParam())

  protected typeFavoriteParam() {
		const typedSchema = { id: schema.string({ trim: true }) }
		
		switch(this.data['type']) {
			case 'favoriteCategories':
				typedSchema['categoryId'] = schema.number([ rules.unsigned() ]) 
				break;
			case 'favoritePublications':
				typedSchema['publicationId'] = schema.string({ trim: true })
				break;
			default:
				throw new LogicException('\'type\' is undefined', 500)
		}

		console.log(typedSchema)

		return typedSchema
	}

  public messages = {
		required: 'Required field {{ field }}',
		unsigned: 'Value {{ field }} cannot be negative',
		number: ' {{ field }} not a number type',
		rules: 'Numbers from 1 to 4 are accepted'
	}
}
