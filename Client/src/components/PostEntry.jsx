import React from 'react'

const PostEntry = ({post}) => (
  <div>
    <img src={post.url}/>
    <div>{post.caption}</div>
    <div>{post.likeCount}</div>
  </div>
)

export default PostEntry