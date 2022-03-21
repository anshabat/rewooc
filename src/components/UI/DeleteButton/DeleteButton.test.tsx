import React from 'react'
import { render } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

fit("renders DeleteButton component", () => {
	const component = render(<DeleteButton />)
	const button = component.getByRole('button')
	expect(button).toBeInTheDocument()
});


// it('preloader is visible if component is loading', () => {
//   const component = render(<DeleteButton isLoading={true} />)
//   const loaderElement = component.find('.fa-spin')
//   expect(loaderElement).toHaveLength(1)
// })

// it("preloader is hidden if component isn't loading", () => {
//   const component = render(<DeleteButton />)
//   const loaderElement = component.find('.fa-spin')
//   expect(loaderElement).toHaveLength(0)
// })

// it('clicking on onDelete prop', () => {
//   const mockCallback = jest.fn()
//   const component = shallow(<DeleteButton onDelete={mockCallback} />)
//   expect(mockCallback.mock.calls.length).toBe(0)
//   component.find('.rw-delete-button').simulate('click')
//   expect(mockCallback.mock.calls.length).toBe(1)
// })