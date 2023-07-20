import { render, fireEvent } from '@testing-library/react'
import MessageSubmitForm from '@/app/Chat/SubmitForm'

describe('MessageSubmitForm Component', () => {
	const currentMessage = 'Hello, this is a test message.'
	const onMessageType = jest.fn()
	const onSubmit = jest.fn()

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('Rendering', () => {
		test('renders input field with default placeholder text', () => {
			const { getByPlaceholderText } = render(
				<MessageSubmitForm
					currentMessage={currentMessage}
					onMessageType={onMessageType}
					onSubmit={onSubmit}
				/>
			)

			const inputElement = getByPlaceholderText('Type your message here...')
			expect(inputElement).toBeInTheDocument()
			expect(inputElement).toHaveValue(currentMessage)
		})

		test('renders send button with default text', () => {
			const { getByText } = render(
				<MessageSubmitForm
					currentMessage={currentMessage}
					onMessageType={onMessageType}
					onSubmit={onSubmit}
				/>
			)

			const buttonElement = getByText('Send')
			expect(buttonElement).toBeInTheDocument()
		})
	})

	describe('User Interaction', () => {
		test('calls onMessageType when input value changes', () => {
			const { getByPlaceholderText } = render(
				<MessageSubmitForm
					currentMessage={currentMessage}
					onMessageType={onMessageType}
					onSubmit={onSubmit}
				/>
			)

			const inputElement = getByPlaceholderText('Type your message here...')
			const newMessage = 'New message'

			fireEvent.change(inputElement, { target: { value: newMessage } })

			expect(onMessageType).toHaveBeenCalledTimes(1)
		})

		test('calls onSubmit when form is submitted', () => {
			const { getByTestId } = render(
				<MessageSubmitForm
					currentMessage={currentMessage}
					onMessageType={onMessageType}
					onSubmit={onSubmit}
				/>
			)

			const formElement = getByTestId('message-submit-form')
			fireEvent.submit(formElement)

			expect(onSubmit).toHaveBeenCalledTimes(1)
		})
	})
})
