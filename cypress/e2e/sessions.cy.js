describe('POST /sessions', () => {

    it('User session', () => {

        const userData = {
            name: "Session User Test",
            email: "SessionUser@quality.com",
            password: "pwd123"
        }

        cy.task('deleteUser', userData.email)
        cy.postUser(userData)

        cy.postSession(userData)
            .then(response => {
                expect(response.status).to.eq(200)

                const { user, token } = response.body

                expect(user.name).to.eq(userData.name)
                expect(user.email).to.eq(userData.email)
                expect(token).not.to.be.empty
            })
    })

    it('Invalid password', () => {

        const user = {
            email: "UserTestQA@quality.com",
            password: "pwd1234"
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })

    it('email not found', () => {

        const user = {
            email: "NotUserTestQA@quality.com",
            password: "pwd123"
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })

})

Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: { email: user.email, password: user.password },
        failOnStatusCode: false
    }).then(response => { return response })
})