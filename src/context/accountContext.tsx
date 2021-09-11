import React, { FC, ReactNode, useContext, useEffect, useState } from 'react'

export const AccountContext = React.createContext({
  title: '',
  setTitle: (value: string) => {
    return
  },
})

interface IProps {
  children: (title: string) => ReactNode
}

export const AccountProvider: FC<IProps> = ({ children }) => {
  const [title, setTitle] = useState('My Account')

  const setTitleHandler = (value: string): void => {
    setTitle(value)
  }

  return (
    <AccountContext.Provider
      value={{ title: title, setTitle: setTitleHandler }}
    >
      {children(title)}
    </AccountContext.Provider>
  )
}

export const useAccountContext = (title?: string): void => {
  const { setTitle } = useContext(AccountContext)

  useEffect(() => {
    if (title) setTitle(title)
  }, [title])
}
