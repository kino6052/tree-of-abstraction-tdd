import React from 'react'

export const Post: React.SFC<{
  post: { title: string }
}> = props => {
  const {
    post: { title },
  } = props
  return <li>{title}</li>
}
