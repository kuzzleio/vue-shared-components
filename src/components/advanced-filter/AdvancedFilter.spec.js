// This file contains tests for the Advanced Filters that were
// designed for the Alert Rule Create or Update view, so the
// context comes from that view. They should be completed and
// made generic, but the logic is OK.

describe('Update Advanced Filters', () => {
  it('Should be able to open a rule with a null filter', () => {
    cy.fixture('alert-rules').then(({ coldChain }) => {
      coldChain.body.filters = null;
      cy.fixture('tenant').then(({ jeodus }) => {
        cy.request({
          method: 'PUT',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}/_replace`,
          body: coldChain.body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        });
      });
      cy.visit(`/admin/alerts/update/${coldChain._id}`);
      cy.get('[data-cy="AdvancedFilter-attributeSelect--0.0"]').should(
        'be.enabled'
      );
      cy.get('[data-cy="AdvancedFilter-operator--0.0"]').should('be.disabled');
    });
  });

  it('Should add an OR-condition to an existing filter', () => {
    cy.fixture('alert-rules').then(({ coldChain }) => {
      cy.visit(`/admin/alerts/update/${coldChain._id}`);
      cy.get('[data-cy=AdvancedFilter-OrBtn--0]').click();
      const newPredicate = {
        attribute: 'reference',
        operator: 'matches exactly',
        value: 'Guybrush'
      };
      cy.get('[data-cy="AdvancedFilter-attributeSelect--1.0"]').select(
        newPredicate.attribute
      );
      cy.get('[data-cy="AdvancedFilter-operator--1.0"]').select(
        newPredicate.operator
      );
      cy.get('[data-cy="AdvancedFilter-valueInput--1.0"]').type(
        `{selectall}${newPredicate.value}`
      );

      cy.get('[data-cy=Submit-btn]').click();
      cy.url().should('not.contain', coldChain._id);

      cy.fixture('tenant').then(({ jeodus }) => {
        cy.request({
          method: 'GET',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        }).then(response => {
          coldChain.body.filters.or.push({
            and: [
              {
                equals: {
                  [newPredicate.attribute]: newPredicate.value
                }
              }
            ]
          });
          delete response.body.result._source._kuzzle_info;
          expect(response.body.result._source).to.deep.equal(coldChain.body);
        });
      });
    });
  });

  it('Should delete an OR-condition from an existing filter', () => {
    cy.fixture('alert-rules').then(({ coldChain }) => {
      // Update the existing alert with a new clause, so that we can
      // delete it in the test
      const enrichedContent = cloneDeep(coldChain.body);
      enrichedContent.filters.or.push({
        and: [
          {
            equals: {
              reference: 'Guybrush'
            }
          }
        ]
      });

      cy.fixture('tenant').then(({ jeodus }) => {
        cy.request({
          method: 'PUT',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}/_update`,
          body: enrichedContent,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        });
        cy.visit(`/admin/alerts/update/${coldChain._id}`);
        cy.get('[data-cy="AdvancedFilter-removeAndBtn--1.0"]').click();

        cy.get('[data-cy=Submit-btn]').click();
        cy.url().should('not.contain', coldChain._id);

        cy.request({
          method: 'GET',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        }).then(response => {
          delete response.body.result._source._kuzzle_info;
          expect(response.body.result._source).to.deep.equal(coldChain.body);
        });
      });
    });
  });

  it('Adding an empty OR-condition to an existing filter should not alter it', () => {
    cy.fixture('alert-rules').then(({ coldChain }) => {
      cy.visit(`/admin/alerts/update/${coldChain._id}`);
      cy.get('[data-cy=AdvancedFilter-OrBtn--0]').click();

      cy.get('[data-cy=Submit-btn]').click();
      cy.url().should('not.contain', coldChain._id);

      cy.fixture('tenant').then(({ jeodus }) => {
        cy.request({
          method: 'GET',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        }).then(response => {
          const updatedRule = response.body.result._source;
          expect(updatedRule.filters).to.deep.equal(coldChain.body.filters);
        });
      });
    });
  });

  it('Should reset a filter by deleting the only predicate', () => {
    cy.fixture('alert-rules').then(({ coldChain }) => {
      cy.visit(`/admin/alerts/update/${coldChain._id}`);

      cy.get('[data-cy="AdvancedFilter-removeAndBtn--0.0"]').click();

      cy.get('[data-cy=Submit-btn]').click();
      cy.url().should('not.contain', coldChain._id);

      cy.fixture('tenant').then(({ jeodus }) => {
        cy.request({
          method: 'GET',
          url: `${backend}/tenant-${jeodus.tenant.group}-${jeodus.tenant.name}/${ALERT_RULES_COLLECTION}/${coldChain._id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        }).then(response => {
          expect(response.body.result._source.filters).to.eql(null);
        });
      });
    });
  });
});
