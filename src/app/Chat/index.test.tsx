import { render, fireEvent, waitFor } from '@testing-library/react'
import Chat from '@/app/Chat'
import { Author, Message } from '@/shared/types'
import toast from 'react-simple-toasts'
import * as api from '@/shared/api/messages'
import * as scrollBottomUtils from '@/shared/utils/scrollRefToBottom'

jest.mock('@/shared/utils/scrollRefToBottom')
jest.mock('react-simple-toasts', () => ({
	__esModule: true,
	default: jest.fn(),
}))
jest.mock('@/shared/config/env.ts', () => ({ default: {} }))

describe('Chat', () => {
	// Sample messages for testing
	const messagesMock: Message[] = [
		{ id: 1, author: Author.SUPPORT, body: 'Hello, how can I help you?' },
		{ id: 2, author: Author.OWN, body: 'I have a question about my order.' },
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('displays fetched messages on load', async () => {
		jest.spyOn(api, 'getMessages').mockResolvedValue(messagesMock)

		const { getAllByTestId } = render(<Chat />)

		// Wait for messages to be displayed
		await waitFor(() => {
			const messageElements = getAllByTestId('chat-message')
			expect(messageElements).toHaveLength(messagesMock.length)
		})
	})

	test('displays last message when loading a big history', async () => {
		const NUMBER_OF_MESSAGES = 20

		const bigHistory = Array.from(
			{ length: NUMBER_OF_MESSAGES },
			(_, index) => ({
				id: index + 1,
				author: index % 2 === 0 ? Author.SUPPORT : Author.OWN,
				body: `Message ${index + 1}`,
			})
		)

		jest.spyOn(api, 'getMessages').mockResolvedValue(bigHistory)

		const { getAllByTestId } = render(<Chat />)

		// Wait for messages to be displayed
		await waitFor(() => {
			const messageElements = getAllByTestId('chat-message')

			const chatElementScrollSpy = jest.spyOn(scrollBottomUtils, 'default')

			expect(messageElements).toHaveLength(bigHistory.length)
			expect(chatElementScrollSpy).toHaveBeenCalled()

			// Check if the last message is displayed
			const lastMessage = messageElements[messageElements.length - 1]
			expect(lastMessage).toHaveTextContent(`Message ${NUMBER_OF_MESSAGES}`)
		})
	})

	test('updates messages on form submit', async () => {
		const newMessage: Message = {
			id: 3,
			author: Author.OWN,
			body: 'New message',
		}
		jest.spyOn(api, 'sendMessage').mockResolvedValue(newMessage)
		jest.spyOn(api, 'getMessages').mockResolvedValue(messagesMock)

		const { getByText, getByPlaceholderText, getAllByTestId } = render(<Chat />)

		// Enter new message in the input field and submit the form
		const inputElement = getByPlaceholderText('Type your message here...')
		const submitButton = getByText('Send')
		fireEvent.change(inputElement, { target: { value: 'New message' } })
		fireEvent.click(submitButton)

		// Wait for the new message to be added
		await waitFor(() => {
			const messageElements = getAllByTestId('chat-message')
			expect(messageElements).toHaveLength(3)
			expect(messageElements[2]).toHaveTextContent('New message')
		})
	})

	test('displays error toast when failed to load messages', async () => {
		jest.spyOn(api, 'getMessages').mockRejectedValue(new Error('API Error'))

		render(<Chat />)

		// Wait for the toast to be displayed
		await waitFor(() => {
			expect(toast).toHaveBeenCalledWith(
				'Unable to load chat history. Please try again later.',
				{
					theme: 'failure',
				}
			)
		})
	})

	test('displays error toast when failed to send message', async () => {
		jest.spyOn(api, 'sendMessage').mockRejectedValue(new Error('API Error'))

		const { getByText, getByPlaceholderText } = render(<Chat />)

		// Enter new message in the input field and submit the form
		const inputElement = getByPlaceholderText('Type your message here...')
		const submitButton = getByText('Send')
		fireEvent.change(inputElement, { target: { value: 'New message' } })
		fireEvent.click(submitButton)

		// Wait for the toast to be displayed
		await waitFor(() => {
			expect(toast).toHaveBeenCalledWith(
				'Unable to send message to server. Please try again later',
				{
					theme: 'failure',
				}
			)
		})
	})
})
