describe('User Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('verifies visibility of favourite books link before and after sign in/out', () => {
        cy.get('[data-testid="favourite-books-link"]').should('not.exist');
        cy.signIn();
        cy.get('[data-testid="favourite-books-link"]').should('be.visible');
        cy.get('[data-testid="auth-btn"]').click();
        cy.get('[data-testid="favourite-books-link"]').should('not.exist');
    });
});

describe('User Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('verifies visibility of favourite books link before and after sign in/out', () => {
        cy.get('[data-testid="favourite-books-link"]').should('not.exist');
        cy.signIn();
        cy.get('[data-testid="favourite-books-link"]').should('be.visible');
        cy.get('[data-testid="auth-btn"]').click();
        cy.get('[data-testid="favourite-books-link"]').should('not.exist');
    });
});