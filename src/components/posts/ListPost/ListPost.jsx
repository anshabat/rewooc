import './ListPost.scss'
import React from 'react'

const ListPost = ({ title, dateCreated }) => (
  <div className="">
    List {title} - {dateCreated}
  </div>
)

export default ListPost
