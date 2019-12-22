import { Subject, Observable } from 'rxjs'
import { IAPIGatewayMessage } from '../Interface/index'
import { filter } from 'rxjs/operators'

type IRequest<
  T extends keyof IAPIGatewayMessage
> = IAPIGatewayMessage[T]['Request']
type IResponse<
  T extends keyof IAPIGatewayMessage
> = IAPIGatewayMessage[T]['Response']

type SubjectValue<T extends keyof IAPIGatewayMessage> = [
  IRequest<T>,
  (response: IResponse<T>) => void
]

export class APIGateway {
  static onInit = new Subject()
  static Subject = new Subject<SubjectValue<keyof IAPIGatewayMessage>>()
  static send = <T extends keyof IAPIGatewayMessage>(
    request: SubjectValue<T>[0],
    callback: SubjectValue<T>[1]
  ) => {
    APIGateway.Subject.next([request, callback])
  }
  static onMessage = <T extends keyof IAPIGatewayMessage>(
    type: IAPIGatewayMessage[T]
  ): Observable<IAPIGatewayMessage[T]['Response']> =>
    (APIGateway.Subject.pipe(
      filter(r => ((r[0].type as unknown) as IAPIGatewayMessage[T]) === type)
    ) as unknown) as Observable<IAPIGatewayMessage[T]['Response']>
}
