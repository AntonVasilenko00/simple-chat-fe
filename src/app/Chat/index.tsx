import { FormEvent, useEffect, useRef, useState } from 'react'
import { sendMessage, getMessages } from '@/shared/api/messages'
import { Message as IMessage } from '@/shared/types'
import Message from '@/app/Chat/Message'
import MessageSubmitForm from '@/app/Chat/SubmitForm'
import toast from 'react-simple-toasts'
import scrollRefToBottom from '@/shared/utils/scrollRefToBottom'

const HEADER_TEXT = 'Support chat app'

const LOAD_CHAT_ERROR = 'Unable to load chat history. Please try again later.'

const SEND_MESSAGE_ERROR =
	'Unable to send message to server. Please try again later'

const Chat: React.FC = () => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [currentMessageValue, setCurrentMessageValue] = useState<string>('')

	const chatRef = useRef<HTMLUListElement>(null)

	const fetchMessages = async () => {
		try {
			const fetchedMessages = await getMessages()

			setMessages(fetchedMessages)
		} catch (err) {
			toast(LOAD_CHAT_ERROR, {
				theme: 'failure',
			})
		}
	}

	const scrollToLastMessage = (behavior: ScrollBehavior = 'smooth') =>
		scrollRefToBottom(chatRef, behavior)

	const handleMessageSubmit = async () => {
		try {
			const message = await sendMessage(currentMessageValue)

			setMessages((messages) => [...messages, message])
		} catch (e) {
			toast(SEND_MESSAGE_ERROR, {
				theme: 'failure',
			})
		}
	}
	const handleMessageChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
		setCurrentMessageValue(e.target.value)

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setCurrentMessageValue('')
		await handleMessageSubmit()
		scrollToLastMessage('smooth')
	}

	useEffect(() => {
		void fetchMessages()
	}, [])

	useEffect(() => {
		scrollToLastMessage('instant')
	}, [messages])

	return (
		<main className='max-w-[800px] mx-auto flex flex-col gap-8 items-center p-2 h-screen'>
			<h1 className='text-xl font-bold'>{HEADER_TEXT}</h1>
			<ul
				data-testid='chat'
				ref={chatRef}
				className='flex flex-col border border-black rounded-2xl w-full h-full p-2 overflow-y-scroll'>
				{messages.map((message) => (
					<Message message={message} key={message.id} />
				))}
			</ul>
			<MessageSubmitForm
				onMessageType={handleMessageChange}
				onSubmit={handleFormSubmit}
				currentMessage={currentMessageValue}
			/>
		</main>
	)
}

export default Chat
