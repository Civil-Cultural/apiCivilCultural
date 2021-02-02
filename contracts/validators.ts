import { SchemaLiteral } from '@ioc:Adonis/Core/Validator'

export type RuleNumberType {
  t: number; 
  getTree(): SchemaLiteral; 
}


export type RuleStringType {
  t: string;
  getTree(): SchemaLiteral;
}

export type Page = {
  page: number,
  perPage: number
}

export type ById = {
  id: string | number;
  type?: string
}