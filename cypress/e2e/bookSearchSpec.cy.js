describe('Search UI accessibility', () => {
    it('verifies search functionality is accessible to the user', () => {
        cy.visit('/');
        cy.get('[data-testid="search-input"]').should('be.visible');
        cy.get('[data-testid="search-button"]').should('be.visible');
    });
});

describe('Book search functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', Cypress.env('VITE_TEST_API_URL')).as('getBooks');
        cy.get('[data-testid="search-input"]').type('js');
        cy.get('[data-testid="search-button"]').click();
    });

    it('verifies that search yields results', () => {
        cy.wait('@getBooks').then((interception) => {
            expect(interception.request.url).to.include('q=js');
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('items');
        });

        cy.get('[data-testid="book-list"]').children().should('have.length.greaterThan', 0);
    });

    it('verifies that loading more results increases the number of displayed books', () => {
        cy.get('[data-testid="book-list"]').children().then(initialBooks => {
            const initialCount = initialBooks.length;
            cy.get('[data-testid="load-more-btn"]').should('be.visible').and('be.enabled').click();
            cy.wait('@getBooks');

            cy.get('[data-testid="book-list"]').children().should('have.length.greaterThan', initialCount);
        });
    });
});

describe('Book search category verification', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', Cypress.env('VITE_TEST_API_URL')).as('getBooks');
    });

    it('verifies that search yields results', () => {
        cy.get('[data-testid="category-select"]').select(1);
        cy.get('[data-testid="search-input"]').type('js');
        cy.get('[data-testid="search-button"]').click();

        cy.wait('@getBooks').then((interception) => {
            expect(interception.request.url).to.include('subject');
        });
    });
});

describe('Book Details Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', Cypress.env('VITE_TEST_API_URL')).as('getBooks');
    });

    it('should allow a user to navigate to the details page of the first result', () => {
        cy.get('[data-testid="search-input"]').type('js');
        cy.get('[data-testid="search-button"]').click();
        cy.wait('@getBooks');
        cy.get('[data-testid="book-list"] > :first-child').click();
        cy.url().should('match', /\/book\/[A-Za-z0-9]+$/);
    });
});