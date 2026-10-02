describe('inloggning', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/login', {
      token: 'test',
      name: 'Anna Andersson',
    }).as('login');
    cy.intercept('GET', '**/api/user', {
      name: 'Anna Andersson',
      contract: 'Rörligt pris',
    });
  });

  it('kunden kan logga in och ser sin översikt', () => {
    cy.visit('/login');
    cy.get('input[placeholder="E-postadress"]').type('anna.andersson@example.com');
    cy.get('input[placeholder="Lösenord"]').type('kraftly-anna');
    cy.contains('button', 'Logga in').click();

    cy.wait('@login');
    cy.get('h1').should('have.text', 'Hej Anna!');
  });
});
