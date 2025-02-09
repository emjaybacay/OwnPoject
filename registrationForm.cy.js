// Homework Task 1
// Cypress Test Suite
// registrationForm.cy.js

describe('Education in Ireland Registration Form Test Cases', () => {
  beforeEach(() => {
    cy.visit('https://africa.educationinireland.live/register/');
  });
  afterEach(() => {
    cy.wait(5000); // Wait for 5 seconds before the next test case
  });

  // Test Case # 1
  it('1. should successfully submit the form with valid data', () => {
    cy.get('select[name="reg_fair"]').select('Nairobi');                   
    cy.fillRegistrationForm('Marc John', 'Bacay', 'rvbg@gmail.com');     
    cy.get('input[name="reg_mobile"]').type('9491373191', { delay: 100 }); 
    cy.get('#form_bday').click();                                          
    cy.get('.year').contains('1999').click();                              
    cy.get('.month').contains('Dec').click();
    cy.get('.day').contains('13').click();
    cy.get('#form_bday').should('not.have.value', '');
    cy.get('select[name="reg_country_code"]').select('+63 - Philippines');
    cy.get('select[name="reg_country_code"]').should('have.value', '63');
    cy.get('select[name="reg_level"]').select('Masters');
    cy.get('select[name="reg_when"]').select('2025');
    cy.get('button.btn.btn_primary.btn_next').click();

    //After successfully clicking the next button
    cy.get('.select2-search__field').first().type('Masters', { delay: 100 });
    cy.contains('.select2-results__option', 'Masters').click();
    cy.get('.select2-search__field').first().type('Post-graduate Diploma',{ delay: 100 });
    cy.contains('.select2-results__option', 'Post-graduate Diploma').click();
    cy.get('.select2-search__field').first().type('PhD',{ delay: 100 });
    cy.contains('.select2-results__option', 'PhD').click();
    cy.get('.select2-search__field').eq(1).type('Japan', { delay: 100 });
    cy.contains('.select2-results__option', 'Japan').click();
    cy.get('.select2-search__field').eq(1).type('New Zealand', { delay: 100 });
    cy.contains('.select2-results__option', 'New Zealand', ).click();
    cy.get('.select2-search__field').eq(1).type('South Korea', { delay: 100 });
    cy.contains('.select2-results__option', 'South Korea', ).click();
    cy.get('.select2-search__field').eq(2).type('Engineering', { delay: 100 });
    cy.contains('.select2-results__option', 'Engineering').click();
    cy.get('.select2-search__field').eq(2).type('Physics', { delay: 100 });
    cy.contains('.select2-results__option', 'Physics').click();
    cy.get('.select2-search__field').eq(2).type('Law', { delay: 100 });
    cy.contains('.select2-results__option', 'Law').click();
    cy.get('input[name="sub_all"]').check();

    // Submit the registration form and validate success message
    cy.get('button.btn_submit').click();
    cy.contains('Your journey to Ireland starts here').should('be.visible');
  });

  // Test Case # 2
  it('2. should Displays "Email Already Registered" alert', () => {
    cy.get('select[name="reg_fair"]').select('Nairobi');
    cy.fillRegistrationForm('Marc', 'Bacay', 'rvbg@gmail.com');
    cy.get('input[name="reg_mobile"]')
    cy.get('.section_title').should('contain', 'Alert: Email Already Registered');
  });

  // Test Case # 3
  it('3. should validate incorrect email format', () => {
    cy.get('input[name="reg_email"]').type('123wrongemail', { delay: 100 });
    cy.get('input[name="reg_confirm_email"]').type('123wrongemail', { delay: 100 });
    cy.get('button.btn.btn_primary.btn_next').click();
    cy.contains('The email you have entered is invalid').should('be.visible');
  });  

  // Test Case # 4
  it('4. should validate incorrect mobile number format', () => {
    cy.get('input[name="reg_mobile"]').type('gfgf', { delay: 100 });
    cy.get('button.btn.btn_primary.btn_next').click();
    cy.contains('Please enter a valid mobile').should('be.visible')
  });

  // Test Case # 5
  it('5. should validate 30 maximum character length for First name and Last name', () => {
    const longText = 'abbjshfbhs hsbf sbf sf sfhjsefhs gdfh fhfs'; // Max length is 30
    cy.get('input[name="reg_fname"]').type(longText, { delay: 100 });
    cy.get('input[name="reg_lname"]').type(longText, { delay: 100 });
    cy.contains('Maximum of 30 characters').should('be.visible');
    cy.get('#main_content').click();
  });

  // Test Case # 6
  it('6. should validate 2 minimum character length for First name and Last name', () => {
    const shortText = 'a'; // Min length is 2
    cy.get('input[name="reg_fname"]').type(shortText, { delay: 100 });
    cy.get('input[name="reg_lname"]').type(shortText, { delay: 100 });
    cy.contains('Minimum of 2 characters').should('be.visible');
    cy.get('#main_content').click();
  });

  // Test Case # 7
  it('7. should show validation error when theres is no input on the fields', () => {
    cy.get('button.btn.btn_primary.btn_next').click();
    cy.contains('This field cannot be empty.').should('be.visible');
    cy.contains('Please select one option.').should('be.visible');
    cy.contains('This field is required.').should('be.visible');
    cy.contains('Please select the fair you\'re going to.').should('be.visible');
  }); 
  
  // Test Case # 8
  it('8. should scroll to the bottom of the page', () => {
    cy.scrollTo('bottom');
    cy.wait(5000);
    cy.get('footer').should('be.visible'); 
  });

  // Test Case # 9
  it('9. Should navigate to the registration page when REGISTER button is clicked', () => {
    cy.get('#register-ei-africa-desktop').should('be.visible').and('have.attr', 'href', 'https://africa.educationinireland.live/register');
    cy.get('#register-ei-africa-desktop').click();
    cy.url().should('eq', 'https://africa.educationinireland.live/register/'); 
  })

  // Test Case # 10
  it('10. Should successfully click the previous button on Step 2 to go back in Step 1', () => {
    cy.get('select[name="reg_fair"]').select('Nairobi');                   
    cy.fillRegistrationForm('Marc John', 'Bacay', 'rvbg@gmail.com');
    cy.get('#reg_btn_email_exists').click();     
    cy.get('input[name="reg_mobile"]').type('9491373191', { delay: 100 }); 
    cy.get('#form_bday').click();                                          
    cy.get('.year').contains('1999').click();                              
    cy.get('.month').contains('Dec').click();
    cy.get('.day').contains('13').click();
    cy.get('#form_bday').should('not.have.value', '');
    cy.get('select[name="reg_country_code"]').select('+63 - Philippines');
    cy.get('select[name="reg_country_code"]').should('have.value', '63');
    cy.get('select[name="reg_level"]').select('Masters');
    cy.get('select[name="reg_when"]').select('2025');
    cy.get('button.btn.btn_primary.btn_next').click();
    cy.wait(2500);
    cy.get('span.btn.btn_primary.btn_prev').click();
    cy.contains('About you').should('be.visible');
  });
});