describe('User authentication flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('toggles the authentication modal to ensure it can be opened and closed', () => {
    cy.toggleAuthModal();
  });
  
  it('should sign in a user with valid credentials and then log out', () => {
    cy.signIn();
    cy.get('[data-testid="auth-btn"]').click();
  });
});