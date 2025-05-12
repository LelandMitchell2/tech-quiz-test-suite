import Quiz from '../../client/src/components/Quiz'


// This is a test file for the Quiz component using Cypress
// It contains tests for rendering the component, starting the quiz, and checking the quiz completion screen
describe('<Quiz />', () => {
  it('renders', () => {
    cy.mount(<Quiz />)
  });

  // Test to check if the quiz component renders correctly
  it('should render the quiz component with the start button', () => {
    cy.mount(<Quiz/>)
    cy.get('div').first().within(() => {
      cy.get('button').contains('Start Quiz').should('be.visible')
    })
  });

  // Test to check if the quiz content is displayed after clicking the start button
  it('renders the quiz content when the "Start Quiz" button is pressed', () => {
    cy.mount(<Quiz/>)
    cy.get('button').contains('Start Quiz').should('be.visible')
    cy.get('button').contains('Start Quiz').click();

    cy.get('.card').should('be.visible')
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.get('button').should('have.length.at.least', 4)
  });

  // Test to check if the next question is displayed after selecting an answer
  it('renders the next question when an answer is selected', () => {
    cy.mount(<Quiz/>)
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
  it('renders the quiz complete screen after the tenth question has been answered', () => {
    cy.mount(<Quiz/>)
    
    cy.get('button').contains('Start Quiz').click();
    
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
    }

    cy.get('h2').should('have.text', 'Quiz Completed').and('be.visible')
    cy.get('.alert').should('include.text', 'Your score:').and('be.visible')
    cy.get('button').should('have.text', 'Take New Quiz').and('be.visible')
  })
})