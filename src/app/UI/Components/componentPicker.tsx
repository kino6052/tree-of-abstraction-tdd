import React from 'react'
import { useSharedState } from '../../Shared'
import { UI, Option } from '..'

export const Picker: React.SFC<{ options: string[] }> = props => {
  const [{ value }] = useSharedState(
    UI.PickerStateSubject.getValue(),
    UI.PickerStateSubject
  )
  const { options } = props
  return (
    <span>
      <h1>{value || options[0]}</h1>
      <select onChange={e => UI.pick(e.target.value as Option)}>
        {options.map(o => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    </span>
  )
}
