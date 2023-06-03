
describe('POST /user', () => {

  it('Register a new user', () => {

    const user = {
      name: "User Test QA",
      email: "UserTestQA@quality.com",
      password: "pwd123"
    }

    cy.request({
      url: '/users',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})