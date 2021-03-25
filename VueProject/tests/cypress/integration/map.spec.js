describe('Map tests', function() {
  it('should access map view', function() {
    cy.visit('/map');
  });

  it('should be able to get map from DOM', function() {
    cy.visit('/map');
    cy.get('[data-cy="map"').get(".vue2leaflet-map")
  });

  it('should be able to get map from DOM', function() {
    cy.visit('/map');
    cy.wait(2000)
    cy.get(".heartIcon").click()
    cy.get('[data-cy="popup-content"')
  });
});
