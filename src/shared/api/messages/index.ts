import axios from '@/shared/config/axios'
import { Author, Message } from '@/shared/types'

const messagesPath = '/messages'

export const getMessages = async (): Promise<Message[]> => {
	const res = await axios.get<Message[]>(messagesPath)
	const messages = res.data
	return messages
}

export const sendMessage = async (
	body: string,
	author: Author = Author.OWN
): Promise<Message> => {
	const res = await axios.post<Message>(messagesPath, {
		body,
		author,
	})
	return res.data
}
