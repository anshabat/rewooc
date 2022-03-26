import React from 'react'
import { fireEvent, render } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

it("renders DeleteButton component", () => {
	const component = render(<DeleteButton />)
	const button = component.getByRole('button')
	expect(button).toBeInTheDocument()
});

it('preloader is visible if component is loading', () => {
  const component = render(<DeleteButton isLoading={true} />)
	const spinner = component.getByLabelText('Deleting in progress')
	expect(spinner).toBeInTheDocument()
})

it("preloader is hidden if component isn't loading", () => {
  const component = render(<DeleteButton />)
	const spinner = component.queryByLabelText('Deleting in progress')
	expect(spinner).not.toBeInTheDocument()
})

it('clicking on onDelete prop', () => {
  const mockCallback = jest.fn()
  const component = render(<DeleteButton onDelete={mockCallback} />)
  expect(mockCallback.mock.calls.length).toBe(0)
  const button = component.getByRole('button')
	fireEvent.click(button)
  expect(mockCallback.mock.calls.length).toBe(1)
})