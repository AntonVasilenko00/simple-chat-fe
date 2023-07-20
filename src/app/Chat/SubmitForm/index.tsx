import classNames from 'classnames'
import { HTMLProps } from 'react'

const SEND_BUTTON_TEXT = 'Send'
const DEFAUlT_PLACEHOLDER_TEXT = 'Type your message here...'

interface MessageSubmitFormProps extends HTMLProps<HTMLFormElement> {
	currentMessage: string
	onMessageType: React.ChangeEventHandler<HTMLInputElement>

	inputProps?: HTMLProps<HTMLInputElement>
	buttonProps?: HTMLProps<HTMLButtonElement>
}

const MessageSubmitForm: React.FC<MessageSubmitFormProps> = ({
	currentMessage,
	onMessageType,
	inputProps,
	buttonProps,
	...props
}) => {
	return (
		<form
			data-testid='message-submit-form'
			className={classNames('w-full flex gap-2', props.className)}
			onSubmit={props.onSubmit}>
			<input
				type='text'
				autoFocus
				value={currentMessage}
				onChange={onMessageType}
				placeholder={DEFAUlT_PLACEHOLDER_TEXT}
				className={classNames(
					'p-2 border rounded-xl w-full focus:cursor-text',
					inputProps?.className
				)}
				{...inputProps}
			/>
			<button
				{...buttonProps}
				type='submit'
				className={classNames(
					'bg-button-primary py-2 px-4 text-white rounded-xl',
					buttonProps?.className
				)}>
				{SEND_BUTTON_TEXT}
			</button>
		</form>
	)
}

export default MessageSubmitForm
