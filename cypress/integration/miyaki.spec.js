// Authentication
// 1. logs in as admin
// 2.
describe('Logging in as admin, adding and deleting from knife inventory', () => {
  it('loads the page and logs in as admin', () => {
    // visit website
    cy.visit('http://localhost:8080/');
    // clicks on Sign In button
    cy.findByRole('button', { name: /sign in/i }).click();
    // inputs admin into username and password
    cy.findByPlaceholderText(/enter username/i).type('admin');
    cy.findByPlaceholderText(/enter password/i).type('admin');
    // clicks on login
    cy.findByRole('button', { name: /login/i }).click();
  });

  // check for cart button
  // check for logout button
  it('shows the Cart and Log Out buttons', () => {
    cy.findByRole('button', { name: /log out/i }).should('be.visible');
  });

  // Add a knife
  it('fills out the form to add a new knife', () => {
    cy.findByPlaceholderText(/name/i).type('Butter Knife');
    cy.findByPlaceholderText(/length/i).type(100);
    cy.findByPlaceholderText(/steel type/i).type('Carbon Steel');
    cy.findByPlaceholderText(/price/i).type(999);
    cy.get('[name="type"]').type('Buttery!!!');
    cy.findByPlaceholderText(/image link/i).type(
      'https://secure.img1-fg.wfcdn.com/im/41195772/resize-h755-w755%5Ecompr-r85/1524/15247309/Liberty+Euro+Solid+Handle+Butter+Knife.jpg'
    );
    cy.findByPlaceholderText(/hrc/i).type(10);
    cy.findByPlaceholderText(/bevel/i).type('Do butter knives have bevels?');
    cy.findByRole('button', { name: /add knife/i }).click();
  });

  it('re-fetches automatically and displays in the list', () => {
    cy.findByText(/butter knife/i)
      .scrollIntoView({ easing: 'linear', duration: 1000, timeout: 1000 })
      .should('be.visible');
  });

  it('adds knives to the cart', () => {
    // cy.get('#cartBtn')
    //   .scrollIntoView({ easing: 'linear', duration: 1000, timeout: 1000 })
    //   .click();
    // cy.get('.ReactModal__Overlay').click();
    // cy.get('#knife-4').scrollIntoView();
    cy.get('#knife-4')
      .scrollIntoView({ easing: 'linear', duration: 500 })
      .click();
    cy.get('#knife-5').scrollIntoView().click();
    cy.get('#knife-6').scrollIntoView().click();
    cy.get('#knife-7')
      .scrollIntoView({ easing: 'linear', duration: 500 })
      .click();
    cy.get('#knife-8').scrollIntoView().click();
    cy.get('#knife-9').scrollIntoView().click();
  });

  it('shows up in the cart and can be deleted', () => {
    cy.get('#cartBtn')
      .scrollIntoView({ easing: 'linear', duration: 500 })
      .click();
    cy.get('.ReactModal__Content > :nth-child(1) > :nth-child(1)').should(
      'be.visible'
    );
    cy.get('.ReactModal__Content > :nth-child(1) > :nth-child(2)').should(
      'be.visible'
    );
  });

  // fill out new knife form
  // click Add Knife button
  // fill out new knife form x2
  // click Add Knife button x2
  // check for new knives (scroll into view)
  // delete the new knives
  // click on Cart button
  // check for 'Your cart is empty.' text
  // click away to close modal
  // click Add to Cart buttons to add many items
  // click on Cart
  // check for Total Price
});
