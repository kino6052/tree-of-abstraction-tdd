import { BehaviorSubject, Subject, combineLatest } from 'rxjs'
import { useState, useEffect } from 'react'
import { skip, filter } from 'rxjs/operators'

export const useSharedState = <T>(
  defaultState: T,
  subject: Subject<T>
): [T, typeof useState] => {
  const [value, setState] = useState(defaultState)
  useEffect(() => {
    const sub = subject.subscribe(s => setState(s))
    return () => sub.unsubscribe()
  })
  const newSetState = (state: T) => subject.next(state)
  // @ts-ignore
  return [value, newSetState]
}

export const setPartial = <T>(
  subject: BehaviorSubject<T>,
  partial: Partial<T>
) => {
  const prev = subject.getValue()
  subject.next({ ...prev, ...partial })
}
