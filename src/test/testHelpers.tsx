import { act, render } from '@testing-library/react'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { createStore, Store } from 'redux'
import { rootReducer } from 'redux/store'
import { AppStateType } from '../redux/store'

interface RenderWithStoreOptions {
  initialState?: AppStateType
  store?: Store
}

export function renderWithStore(
  ui: ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: RenderWithStoreOptions = {}
) {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  }
}

export async function tick() {
  await act(() => Promise.resolve())
}
