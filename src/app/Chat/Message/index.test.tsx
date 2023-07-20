import { Author, Message as IMessage } from '@/shared/types'
import { render } from '@testing-library/react'
import Message from '@/app/Chat/Message'

describe('Message Component', () => {
	const sampleMessage: IMessage = {
		id: 1,
		author: Author.OWN,
		body: 'Hello, this is a test message.',
	}

	test('renders message body correctly', () => {
		const { getByText } = render(<Message message={sampleMessage} />)
		expect(getByText(sampleMessage.body)).toBeInTheDocument()
	})

	test('applies "bg-own-message" class for own messages', () => {
		const { container } = render(<Message message={sampleMessage} />)
		expect(container.firstChild).toHaveClass('bg-own-message')
	})

	test('applies "bg-support-message" class for support messages', () => {
		const supportMessage = { ...sampleMessage, author: Author.SUPPORT }
		const { container } = render(<Message message={supportMessage} />)
		expect(container.firstChild).toHaveClass('bg-support-message')
	})

	test('applies custom classNames from props', () => {
		const customClassName = 'custom-class'
		const { container } = render(
			<Message message={sampleMessage} className={customClassName} />
		)
		expect(container.firstChild).toHaveClass(customClassName)
	})
})
