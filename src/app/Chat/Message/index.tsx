import { Message as IMessage } from '@/shared/types'
import classNames from 'classnames'
import { HTMLProps } from 'react'

interface MessageProps extends HTMLProps<HTMLLIElement> {
	message: IMessage
}

const Message: React.FC<MessageProps> = ({
	message: { author, body },
	...props
}) => {
	return (
		<li
			{...props}
			data-testid='chat-message'
			className={classNames(
				'break-words py-2 px-4 my-2 rounded-2xl text-white text-sm min-h-fit w-fit max-w-[75%]',
				{
					'bg-own-message ml-auto': author === 'own',
					'bg-support-message': author === 'support',
				},
				props.className
			)}>
			{body}
		</li>
	)
}

export default Message
