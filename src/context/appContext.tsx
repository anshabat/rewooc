import React from 'react'
import { IGeneralData } from 'app-data'

export type AppContextType = Omit<IGeneralData, 'cart' | 'user'>
export const AppContext = React.createContext<Partial<AppContextType>>({})

interface IProps {
  value: AppContextType
}
export const AppProvider: React.FC<IProps> = (props) => {
  const { children, value } = props
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
