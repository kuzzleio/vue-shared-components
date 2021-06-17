describe('Table tests', function() {
  it('should access table view', function() {
    cy.visit('/table');
  });

  it('should trigger document:search by typing in filter input', function() {
    cy.visit('/table');
    cy.contains("OCM11")
    cy.get('[data-cy="table-text-filter"').type('toto');
    cy.contains("There is currently no result.")
  });

  it('Select itemPerPage trigger new search', function() {
    cy.visit('/table');
    cy.get("tbody").children().should('have.length', 2)
    cy.get('[data-cy="table-pagination-selector"').select('1');
    cy.get("tbody").children().should('have.length', 1)
  });

  it('Specify bootstrapTableOption is well handled', function() {
    cy.visit('/table');
    cy.get("thead").should("have.class", "thead-dark")
  });

  it('should be able to add customcontent in customFilter slot', function() {
    cy.visit('/table');
    cy.get('[data-cy="table-custom-filter"')
  });
});
