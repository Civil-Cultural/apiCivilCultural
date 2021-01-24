import { ResponseContract } from '@ioc:Adonis/Core/Response'

export default interface HandlerError {
  response: ResponseContract;
  error: any;
}