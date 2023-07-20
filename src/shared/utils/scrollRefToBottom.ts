const scrollRefToBottom = <T extends HTMLElement>(
	ref: React.RefObject<T>,
	behavior: ScrollBehavior = 'smooth'
) => {
	const element = ref?.current
	if (!element) return

	const height = element.scrollHeight
	element.scrollTo({ top: height, behavior: behavior })
}

export default scrollRefToBottom
