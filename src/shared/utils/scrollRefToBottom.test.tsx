/* eslint-disable @typescript-eslint/unbound-method */
import { RefObject } from 'react'
import scrollRefToBottom from '@/shared/utils/scrollRefToBottom'

describe('scrollRefToBottom', () => {
	// Create a utility function to handle optional refs
	const createRef = <T extends HTMLElement>(
		ref: RefObject<T> | null | undefined
	): RefObject<T> => {
		return ref as RefObject<T>
	}

	test.each(['auto', 'smooth'] as ScrollBehavior[])(
		'should scroll the element to the bottom with behavior %p',
		(behavior: ScrollBehavior) => {
			const scrollHeight = 500 // Height of the scrollable element

			// Create a ref object with a current property
			const ref = {
				current: {
					scrollHeight,
					scrollTo: jest.fn(),
				}!,
			} as unknown as RefObject<HTMLElement>
			// Call the scrollRefToBottom function with the ref and behavior
			scrollRefToBottom(createRef(ref), behavior)

			// Check if the scrollTo function is called with the expected arguments
			expect(ref.current?.scrollTo).toHaveBeenCalledTimes(1)
			expect(ref.current?.scrollTo).toHaveBeenCalledWith({
				top: scrollHeight,
				behavior,
			})
		}
	)

	test('should scroll the element to the bottom with default behavior', () => {
		const scrollHeight = 500 // Height of the scrollable element
		const defaultBehavior = 'smooth' // Default ScrollBehavior option

		// Create a ref object with a current property
		const ref = {
			current: {
				scrollHeight,
				scrollTo: jest.fn(),
			}!, // Use 'as any' to bypass type-checking issues for this test
		} as unknown as RefObject<HTMLElement>

		// Call the scrollRefToBottom function with the ref without providing behavior
		scrollRefToBottom(createRef(ref))

		// Check if the scrollTo function is called with the expected arguments using default behavior
		expect(ref.current?.scrollTo).toHaveBeenCalledTimes(1)
		expect(ref.current?.scrollTo).toHaveBeenCalledWith({
			top: scrollHeight,
			behavior: defaultBehavior,
		})
	})
})
