/// <reference types="Cypress" />

const host = 'http://localhost:5173'

describe('Chat App', () => {
	it('should load the app and display header text', () => {
		cy.visit(host)

		cy.contains('Support chat app').should('be.visible')
	})

	it('should send and display a new message', () => {
		const message = 'Hello, this is a test message.'

		cy.visit(host)
		cy.get('input[type="text"]').type(message)
		cy.contains('Send').click()
		cy.contains(message).should('be.visible')
	})
})
