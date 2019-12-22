import React from 'react'
import { UI } from '..'

export const Refresh: React.SFC<{}> = props => {
  return (
    <a
      href={'#'}
      onClick={() => {
        UI.refresh()
      }}
    >
      Refresh
    </a>
  )
}
