
describe('POST /user', () => {

  it('Register a new user', () => {

    const user = {
      name: "User Test QA",
      email: "UserTestQA@quality.com",
      password: "pwd123"
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })

  })
})


Cypress.Commands.add('postUser', (user) => {
  cy.api({
    url: '/users',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then(response => { return response })
})