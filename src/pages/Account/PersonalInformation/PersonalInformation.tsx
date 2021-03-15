import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectAccountUser } from '../../../redux/account/accountSelector'
import Loader from '../../../components/UI/loaders/Loader/Loader'

const PersonalInformation: FC = () => {
  const user = useSelector(selectAccountUser)

  if (!user) return <Loader />

  return (
    <div>
      Personal information
      <h1>{user.displayName}</h1>
    </div>
  )
}

export default PersonalInformation
