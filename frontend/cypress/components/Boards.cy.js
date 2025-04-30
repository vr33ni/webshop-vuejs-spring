/// <reference types="cypress" />

import Boards from '../../src/components/shop/Boards.vue'
 
describe('<Boards />', () => {
  beforeEach(() => {
    cy.intercept('/api/items/boards', { fixture: 'boards/items.json' }).as('fetchItems');
    cy.mountWithPinia(Boards);
  });


  it('renders', () => {
    cy.get('h1').contains('Boards')
  })

  it('fetches and displays items on mount', () => {
    cy.wait('@fetchItems')
    cy.get('.surfboard-list li').should('have.length.greaterThan', 0)
  })

  it('searches items by name', () => {
    cy.intercept('GET', '/api/items/boards/search?name=Test', { fixture: 'boards/search-name.json' }).as('searchItems')
     cy.get('input[placeholder="Search by name"]').type('Test');
     cy.wait('@searchItems')
    cy.get('.surfboard-list li').should('have.length.greaterThan', 0)
    cy.get('.surfboard-list li').first().contains('Test')
  });

   it('searches items by brand', () => {
    cy.intercept('GET', '/api/items/boards/brand/*', { fixture: 'boards/search-brand.json' }).as('searchByBrand');
    cy.get('input[placeholder="Search by brand"]').type('TestBrand');
    cy.wait('@searchByBrand');
    cy.get('.surfboard-list li').should('have.length.greaterThan', 0);
    cy.get('.surfboard-list li').first().contains('TestBrand');
  });

  it('searches items by type', () => {
    cy.intercept('GET', '/api/items/boards/type/*', { fixture: 'boards/search-type.json' }).as('searchByType');
    cy.get('input[placeholder="Search by type"]').type('TestType');
    cy.wait('@searchByType');
    cy.get('.surfboard-list li').should('have.length.greaterThan', 0);
    cy.get('.surfboard-list li').first().contains('TestType');
  });


  it('displays error on fetch failure', () => {
    cy.intercept('GET', '/api/items/boards', { statusCode: 500, fixture: 'boards/fetch-error.json' }).as('fetchError')
    cy.mount(Boards)
    cy.wait('@fetchError')
    cy.get('body').contains('Error fetching items')
  })

  it('displays error on search failure', () => {
    cy.intercept('GET', '/api/items/search*', { statusCode: 500, fixture: 'boards/search-error.json' }).as('searchError');
    cy.get('input[placeholder="Search by name"]').type('Test');
    cy.wait('@searchError');
    cy.get('body').contains('Error searching items');
  });
})
