import './ListPost.scss'
import React from 'react'

const ListPost = (props) => {
  return (
    <div className="">
      List {props.title} - {props.dateCreated}
    </div>
  )
}

export default ListPost
