import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Orders from 'pages/Account/Orders/Orders'
import * as api from 'hooks/usePageData'
import { getOrdersMock } from 'test/ordersMock'
import { AppProvider } from 'context/appContext'
import { getAppData } from 'test/appDataMocks'
import { MemoryRouter } from 'react-router-dom'

Object.defineProperty(window, 'location', {
  get() {
    return new URL('http://localhost/?price=,&orderBy=id&direction=asc&pages=1')
  },
})

const appData = getAppData()

function renderOrders() {
  return render(
    <AppProvider value={appData}>
      <MemoryRouter>
        <Orders />
      </MemoryRouter>
    </AppProvider>
  )
}

function renderItems(component: any) {
  const rows = component.getAllByRole('row')
  const [_, ...orderRows] = rows as HTMLElement[]
  const [first] = within(orderRows[0]).getAllByRole('cell')
  const [last] = within(orderRows[orderRows.length - 1]).getAllByRole('cell')
  return { first, last }
}

describe('user orders', () => {
  const orders = getOrdersMock()

  it('should show preloader initially', async () => {
    renderOrders()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should show orders list', async () => {
    const fn = jest.spyOn(api, 'usePageData')
    fn.mockReturnValue({ orders, title: 'Orders' })
    renderOrders()
    const rows = screen.getAllByRole('row')
    const [_, ...orderRows] = rows

    expect(orderRows).toHaveLength(3)
  })

  it('pagination', () => {
    const fn = jest.spyOn(api, 'usePageData')
    fn.mockReturnValue({ orders, title: 'Orders' })
    renderOrders()

    const pagination = screen.getByLabelText('Pagination')
    const listItems = within(pagination).getAllByRole('listitem')
    const firstPageBtn = within(pagination).getByRole('button', { name: '1' })
    const secondPageBtn = within(pagination).getByRole('button', { name: '2' })

    expect(listItems).toHaveLength(2)
    expect(firstPageBtn).toBeDisabled()

    fireEvent.click(secondPageBtn)

    const rows = screen.getAllByRole('row')
    const [_, ...orderRows] = rows
    const [id] = within(orderRows[0]).getAllByRole('cell')

    expect(firstPageBtn).not.toBeDisabled()
    expect(secondPageBtn).toBeDisabled()
    expect(orderRows).toHaveLength(1)
    expect(id).toHaveTextContent('4')
  })

  it('load more', () => {
    const fn = jest.spyOn(api, 'usePageData')
    fn.mockReturnValue({ orders, title: 'Orders' })
    renderOrders()

    const loadMoreBtn = screen.getByRole('button', { name: /Load more/i })
    expect(loadMoreBtn).toBeEnabled()

    fireEvent.click(loadMoreBtn)
    const rows = screen.getAllByRole('row')
    const [_, ...orderRows] = rows

    expect(orderRows).toHaveLength(4)
    expect(loadMoreBtn).toBeDisabled()

    const pagination = screen.getByLabelText('Pagination')
    const firstPageBtn = within(pagination).getByRole('button', { name: '1' })
    const secondPageBtn = within(pagination).getByRole('button', { name: '2' })

    expect(firstPageBtn).toBeDisabled()
    expect(secondPageBtn).toBeDisabled()
  })

  it('sorting', () => {
    const fn = jest.spyOn(api, 'usePageData')
    fn.mockReturnValue({ orders, title: 'Orders' })
    const component = renderOrders()
    const table = component.getByRole('table')
    const numberBtn = within(table).getByRole('button', { name: /Number/i })
    const totalBtn = within(table).getByRole('button', { name: /Total/i })
    expect(numberBtn).toBeInTheDocument()
    expect(totalBtn).toBeInTheDocument()

    expect(renderItems(component).first).toHaveTextContent('1')
    expect(renderItems(component).last).toHaveTextContent('3')
    expect(within(numberBtn).getByRole('img')).toHaveAccessibleName(
      'Sort ascending'
    )

    fireEvent.click(numberBtn)

    expect(renderItems(component).first).toHaveTextContent('4')
    expect(renderItems(component).last).toHaveTextContent('2')
    expect(within(numberBtn).getByRole('img')).toHaveAccessibleName(
      'Sort descending'
    )

    fireEvent.click(numberBtn)

    expect(renderItems(component).first).toHaveTextContent('1')
    expect(renderItems(component).last).toHaveTextContent('3')
    expect(within(numberBtn).getByRole('img')).toHaveAccessibleName(
      'Sort ascending'
    )

    fireEvent.click(totalBtn)
    expect(within(numberBtn).queryByRole('img')).not.toBeInTheDocument()
    expect(renderItems(component).first).toHaveTextContent('2')
    expect(renderItems(component).last).toHaveTextContent('1')
    expect(within(totalBtn).getByRole('img')).toHaveAccessibleName(
      'Sort descending'
    )

    fireEvent.click(totalBtn)
    expect(renderItems(component).first).toHaveTextContent('3')
    expect(renderItems(component).last).toHaveTextContent('4')
    expect(within(totalBtn).getByRole('img')).toHaveAccessibleName(
      'Sort ascending'
    )
  })

  it('filter', () => {
    const fn = jest.spyOn(api, 'usePageData')
    fn.mockReturnValue({ orders, title: 'Orders' })
    const component = renderOrders()
    const filter = component.getByLabelText(/Orders filter/i)

    expect(
      within(filter).queryByRole('button', { name: 'Clear' })
    ).not.toBeInTheDocument()
    expect(within(filter).queryAllByRole('checkbox')).toHaveLength(0)

    fireEvent.click(within(filter).getByRole('button', { name: 'Status' }))

    const statusList = screen.getByRole('list', { name: 'Filter by Status' })
    const [status1, status2, status3] = within(statusList).getAllByRole(
      'listitem'
    )

    expect(within(filter).queryAllByRole('checkbox')).toHaveLength(3)

    expect(within(status1).getByLabelText('count')).toHaveTextContent('(2)')
    expect(within(status2).getByLabelText('count')).toHaveTextContent('(1)')
    expect(within(status3).getByLabelText('count')).toHaveTextContent('(1)')

    fireEvent.click(within(status1).getByRole('checkbox', { name: 'Status 1' }))

    expect(within(status1).getByLabelText('count')).toHaveTextContent('(2)')
    expect(within(status2).getByLabelText('count')).toHaveTextContent('(3)')
    expect(within(status3).getByLabelText('count')).toHaveTextContent('(3)')

    // Load More & Pagination
    expect(screen.getByRole('button', { name: /Load more/i })).toBeDisabled()
    expect(
      within(screen.getByLabelText('Pagination')).getAllByRole('listitem')
    ).toHaveLength(1)

    fireEvent.click(within(filter).getByRole('button', { name: 'Delivery' }))

    const deliveryList = screen.getByRole('list', {
      name: 'Filter by Delivery',
    })
    const [delivery1, delivery2, delivery3] = within(deliveryList).getAllByRole(
      'listitem'
    )

    expect(within(delivery1).getByLabelText('count')).toHaveTextContent('(1)')
    expect(within(delivery2).getByLabelText('count')).toHaveTextContent('(0)')
    expect(within(delivery3).getByLabelText('count')).toHaveTextContent('(1)')

    expect(
      within(delivery2).getByRole('checkbox', { name: 'Method 2' })
    ).toBeDisabled()

    fireEvent.click(within(filter).getByRole('button', { name: 'Clear' }))

    expect(
      within(filter).queryByRole('button', { name: 'Clear' })
    ).not.toBeInTheDocument()
    expect(within(filter).queryAllByRole('checkbox')).toHaveLength(0)
    expect(screen.getByRole('button', { name: /Load more/i })).toBeEnabled()
    expect(
      within(screen.getByLabelText('Pagination')).getAllByRole('listitem')
    ).toHaveLength(2)
  })
})
