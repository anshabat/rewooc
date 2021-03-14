import './ListPost.scss'
import React, { FC } from 'react'

interface IProps {
  title: string
  dateCreated: string
}

const ListPost: FC<IProps> = ({ title, dateCreated }) => {
  return (
    <div className="">
      List {title} - {dateCreated}
    </div>
  )
}

export default ListPost
