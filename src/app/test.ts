import { Subject, Observable } from 'rxjs'
import { filter, take } from 'rxjs/operators'

const uniqueId = () => `${Math.random().toFixed(5) * 100000}`

enum RequestType {
  One = 'One',
  Two = 'Two',
}

interface RequestParams {
  [RequestType.One]: {
    test: string
  }
}

interface ResponsePayload {
  [RequestType.One]: {
    check: string
  }
}

interface RequestSubjectValue<T extends keyof RequestParams> {
  id: string
  type: T
  parameters: RequestParams[T]
}

interface ResponseSubjectValue<T extends keyof ResponsePayload> {
  id: string
  type: T
  payload: ResponsePayload[T]
}

export class TestSubject {
  static onInit = new Subject()
  static RequestSubject = new Subject<
    RequestSubjectValue<keyof RequestParams>
  >()
  static ResponseSubject = new Subject<
    RequestSubjectValue<keyof ResponsePayload>
  >()
  static send = <T extends keyof RequestParams>(
    request: RequestSubjectValue<T>,
    callback: (payload: ResponsePayload[T]) => void
  ) => {
    const uniqueId = '1'
    TestSubject.onMessage(request.type, uniqueId).subscribe(r => {
      callback(r.payload)
    })
    TestSubject.RequestSubject.next(request)
  }
  static onMessage = <T extends keyof ResponsePayload>(
    type: T,
    id: string
  ): Observable<ResponseSubjectValue<T>> => {
    TestSubject.RequestSubject.subscribe(r => {})
    return (TestSubject.ResponseSubject.pipe(
      filter(r => r.id === id),
      take(1)
    ) as unknown) as Observable<ResponseSubjectValue<T>>
  }
}

// 1. Send Request + Create Id
// 2. Subscribe on the Channel with the Id
// 3. Receive Response with the Right Id
// 4. Unsubscribe
