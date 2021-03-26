describe('Form tests', function() {
    it('should access form view', function() {
      cy.visit('/form');
    });

    it('should be able to type in text input', function() {
        cy.visit('/form');
        cy.get('input#model[type="text"]').type('My-super-model-KX-3450')
      });

      it('should be able to type in a textarea', function() {
        cy.visit('/form');
        cy.get('textarea#description').type('Youhou super description trop bien KIoTP lol')
      });

      it('should be able to a numeric value', function() {
        cy.visit('/form');
        cy.get('input#price[type="number"]').type("42")
      });

      it('should be able to check a checkbox', function() {
        cy.visit('/form');
        cy.get('input#enabled[type="checkbox"]').check()
      });

      it('should be able to type in json input', function() {
        cy.visit('/form');
        cy.get('[data-cy="JSONEditor').first()
        .type(`{selectall}{backspace}{
  "lol": "toto"`)
      });

      it('should be able to enter a date/time', function() {
        cy.visit('/form');
        cy.get('[data-cy="datePickerInput').type('1995/06/23')
        cy.get('[data-cy="timePickerInput').type('12:42:42')
      });
  });
  
