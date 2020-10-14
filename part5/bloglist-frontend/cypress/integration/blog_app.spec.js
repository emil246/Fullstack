describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('user can log in', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })


  it('login fails with wrong password', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'Test1', author: 'Emil', likes:'2', url:'test.ru' })
      cy.createBlog({ title: 'Test2', author: 'Bobik', likes:'3', url:'test.ru' })
      cy.createBlog({ title: 'Test3', author: 'Bobik', likes:'15', url:'test.ru' })

    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.title').type('a blog created by cypress')
      cy.get('.author').type('Emil')
      cy.get('.likes').type('23')
      cy.get('.url').type('test.ru')
      cy.contains('save').click()

      cy.contains('succesful adding')
      cy.contains('cypress Emil')
      cy.contains('Details').click()
      cy.contains('like').click()
      cy.contains('24')
      cy.contains('remove').click()
      cy.contains('succesful deleted')

      cy.get('#root > :nth-child(1) > :nth-child(4) > :nth-child(1)').contains('Test3')

    })
  })

})