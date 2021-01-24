import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccountUser } from '../../../redux/account/accountSelector'

function PersonalInformation() {
  const user = useSelector(selectAccountUser)

  return (
    <div>
      Personal information
      <h1>{user.displayName}</h1>
    </div>
  )
}

export default PersonalInformation
