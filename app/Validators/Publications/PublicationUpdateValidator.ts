import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TypePublicationsEnum } from "Contracts/models"

export default class PublicationUpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api
	
  public schema = schema.create({
    title: schema.string.optional({
      trim: true
    }),

    subTitle: schema.string.optional({
      trim: true
    }),

    content: schema.string.optional({
      trim: true
    }),

    image: schema.file.optional({
      size: "3mb",
      extnames: ["png","jpg","jpeg","bmp","gif","diff"]
    }),

    video: schema.file.optional({
      size: "2mb",
      extnames: ["mp4","m4v","mov","avi"]
    }),

    typePublication: schema.enum.optional(
      Object.values(TypePublicationsEnum) as Array<number>
    ),

    author: schema.string.optional({
      trim: true
    }),

    category: schema.array.optional().members(
      schema.number()
    ),

    topic: schema.array.optional().members(
      schema.number()
    )
  })

	
  public messages = {}
}
