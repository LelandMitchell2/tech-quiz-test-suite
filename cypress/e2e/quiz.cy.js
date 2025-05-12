
// This is a Cypress test file for the Tech Quiz application.
// It contains tests for loading the page, starting the quiz, answering questions, and displaying the final score.
describe('Tech Quiz', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001/');
  });

  // Test to check if the page loads with a start quiz button
  it('should load the page with a start quiz button', () => {
    cy.visit('/')

    cy.get('div').first().within(() => {
      cy.get('button').contains('Start Quiz').should('be.visible')
    })
  });

  // Test to check if the quiz content is displayed after clicking the start button
  it('should load the quiz content when the start button is pressed', () => {
    cy.get('button').contains('Start Quiz').should('be.visible')
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible')
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.get('button').should('have.length.at.least', 4)
  });

  // Test to check if the next question is displayed after selecting an answer
  it('should load the next question after an answer is chosen', () => {
    cy.get('button').contains('Start Quiz').click();

    cy.get('h2').as('questionText')
    cy.get('@questionText').invoke('text').then((oldText) => {
      cy.get('button').first().click()

      cy.get('.card').should('be.visible')

      cy.get('h2').should('be.visible').and('not.be.empty').then(($newQuestion) => {
        expect($newQuestion.text()).to.not.equal(oldText) 
    })
    })

    cy.get('button').should('have.length.at.least', 4)
  });

  // Test to check if the quiz complete screen is displayed after answering the tenth question
  it('should end the quiz when all questions are answered', () => {
    
    cy.get('button').contains('Start Quiz').click();
    
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

    cy.get('h2').should('have.text', 'Quiz Completed').and('be.visible')
    cy.get('.alert').should('include.text', 'Your score:').and('be.visible')
    cy.get('button').should('have.text', 'Take New Quiz').and('be.visible')
  });

  // Test to check if the score is displayed when the quiz is over
  it('should display the users score when the quiz is over', () => {
    
    cy.get('button').contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

   
    cy.get('.alert')
      .should('be.visible')
      .invoke('text')
      .should((text) => {
        expect(text).to.match(/Your score: \d+\/\d+/);
      })

    
  });

  // Test to check if a new quiz can be started after completing the previous one
  // This test checks if the "Take New Quiz" button works correctly
  it('should start a new quiz when the take new quiz button is pressed', () => {

    cy.get('button').contains('Start Quiz').click();
    
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

    cy.get('button').should('have.text', 'Take New Quiz').click();

    cy.get('.card').should('be.visible')
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.get('button').should('have.length.at.least', 4)
  });
})