
describe('POST /user', () => {

  context('Create an account', () => {
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
  
    it('Dplicate email', () => {
  
      const user = {
        name: "User Test QA",
        email: "UserTestQA@quality.com",
        password: "pwd123"
      }
  
      cy.task('deleteUser', user.email)
  
      cy.postUser(user)
  
      cy.postUser(user)
        .then(response => {
  
          const { message } = response.body
  
          expect(response.status).to.eq(409)
          expect(message).to.eq('Duplicated email!')
        })
  
    })
  })

  context('Required fields', () => {

    let user;

    beforeEach(() => {
      user = {
        name: "Required Test QA",
        email: "requiredfields@quality.com",
        password: "pwd123"
      }
    })

    it('Name is required', () => {

      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('Email is required', () => {

      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('Password is required', () => {

      delete user.password

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is required')
        })
    })

  })

  context('Not allowed to be empty', () => {
    let user;

    beforeEach(() => {
      user = {
        name: "Empty Test QA",
        email: "empty@quality.com",
        password: "pwd123"
      }
    })

    it('Name is not allowed to be empty', () => {

      user.name = ''

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is not allowed to be empty')
        })
    })

    it('Email is not allowed to be empty', () => {

      user.email = ''

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is not allowed to be empty')
        })
    })

    it('Password iis not allowed to be empty', () => {

      user.password = ''

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is not allowed to be empty')
        })
    })

  })
})