import React, { useContext } from 'react'
import { IGeneralData } from 'app-data'

export type AppContextType = Omit<IGeneralData, 'cart' | 'user'>
const AppContext = React.createContext<AppContextType | null>(null)

interface IProps {
  value: AppContextType
}
export const AppProvider: React.FC<IProps> = (props) => {
  const { children, value } = props
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be inside a Provider with a value')
  }
  return context
}
