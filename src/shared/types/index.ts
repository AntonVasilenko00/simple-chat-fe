export enum Author {
	OWN = 'own',
	SUPPORT = 'support',
}

export interface Message {
	id: number
	author: Author
	body: string
}
