import React, { FC, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAccountUser } from '../../../redux/account/accountSelector'
import Loader from '../../../components/UI/loaders/Loader/Loader'
import { AccountContext } from '../Account'

const PersonalInformation: FC = () => {
  const user = useSelector(selectAccountUser)

  const { title, setTitle } = useContext(AccountContext)

  useEffect(() => {
    setTitle('Personal info' || title)
  }, [title])

  if (!user) return <Loader />

  return (
    <div>
      Personal information
      <h1>{user.displayName}</h1>
    </div>
  )
}

export default PersonalInformation
