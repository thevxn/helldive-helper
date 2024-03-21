// https://docs.cypress.io/api/introduction/api.html
/// <reference types="cypress-xpath" />

describe('Home view', () => {
  it('navbar contains the correct links', () => {
    cy.visit('/')
    cy.xpath('//header').contains('button', 'Domů')
    cy.xpath('//header').contains('button', 'O nás')
    cy.xpath('//header').contains('button', 'Časté dotazy')
    cy.xpath('//header').contains('button', 'Listings')
    cy.xpath('//header').contains('button', 'Přihlásit se')
    cy.xpath('//header').contains('button', 'Registrace')
  })
  it('body contains the correct text', () => {
    cy.visit('/')
    cy.contains('h2', 'Kapka pro ušáčka')
    cy.contains('h3', 'Registr králičích dárců krve')
  })
  it('cookies notice is present', () => {
    cy.visit('/')
    cy.contains('h4', 'Nastavení soukromí')
  })
})
