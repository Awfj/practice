Cypress.Commands.add('signIn', () => {
    cy.get('[data-testid="auth-btn"]').click();
    cy.get('[data-testid="email-input"]').type(Cypress.env('VITE_TEST_USER_EMAIL'));
    cy.get('[data-testid="password-input"]').type(Cypress.env('VITE_TEST_USER_PASSWORD'));
    cy.get('[data-testid="sign-in-btn"]').click();
});

Cypress.Commands.add('toggleAuthModal', () => {
    cy.get('[data-testid="auth-btn"]').click();
    cy.get('[data-testid="auth-close-btn"]').click();
    cy.get('[data-testid="auth-modal"]').should('not.exist');
});