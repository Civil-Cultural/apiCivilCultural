import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TypePublicationsEnum } from "Contracts/models"

export default class PublicationValidator {

  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

	public schema = schema.create({
    title: schema.string({
      trim: true
    }),

    subtitle: schema.string({
      trim: true
    }),

    content: schema.string({
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

    typePublication: schema.enum(
      Object.values(TypePublicationsEnum)
    ),

    authorId: schema.string({
      trim: true
    }),

    categoryId: schema.number([
      rules.unsigned()
    ]),

    topicId: schema.number([
      rules.unsigned()
    ])
  })

  public messages = {

  }
}
