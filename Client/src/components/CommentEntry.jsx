import React from 'react'

const CommentEntry = ({comment}) => (
  <div>
    {`${comment[0]}: ${comment[1]}`}
  </div>
)

export default CommentEntry