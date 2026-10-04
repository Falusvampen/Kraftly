describe('inloggning', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/v2/auth/login', {
      accessToken: 'test',
      name: 'Anna Andersson',
    }).as('login');
    cy.intercept('GET', '**/api/v2/user', {
      name: 'Anna Andersson',
      contract: 'Rörligt pris',
    });
    cy.intercept('GET', '**/api/v2/consumption', {
      unit: 'kWh',
      months: ['Jan'],
      values: [100],
      pricePerKwh: 2,
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
