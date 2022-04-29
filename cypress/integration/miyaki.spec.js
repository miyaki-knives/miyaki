// Authentication
// 1. logs in as admin
// 2.
describe('Logging in as admin, adding and deleting from knife inventory', () => {
  it('loads the page and logs in as admin', () => {
    // visit website
    cy.visit('http://localhost:8080/');
    // clicks on Sign In button
    // cy.findByRole('button', { name: /log in/i }).click();
    cy.get('.MuiButton-root').click();
    // inputs admin into username and password
    cy.get('#usernameInput').type('admin');
    cy.get('#passwordInput').type('admin');
    // clicks on login
    cy.get('#loginButton').click();
  });

  // // check for cart button
  // // check for logout button
  it('shows the Cart and Log Out buttons', () => {
    cy.get('#cartBtn').should('be.visible');
    cy.findByRole('button', { name: /log out/i }).should('be.visible');
  });

  const typeOptions = { scrollBehavior: 'center' };
  // Add a knife
  it('fills out the form to add a new knife', () => {
    cy.findByPlaceholderText(/name/i).type('Butter Knife', typeOptions);
    cy.findByPlaceholderText(/length/i).type(100, typeOptions);
    cy.findByPlaceholderText(/steel type/i).type('Carbon Steel', typeOptions);
    cy.findByPlaceholderText(/price/i).type(999, typeOptions);
    cy.get('[name="type"]').type('Buttery!!!', typeOptions);
    cy.findByPlaceholderText(/image link/i).type(
      'https://secure.img1-fg.wfcdn.com/im/41195772/resize-h755-w755%5Ecompr-r85/1524/15247309/Liberty+Euro+Solid+Handle+Butter+Knife.jpg',
      typeOptions
    );
    cy.findByPlaceholderText(/hrc/i).type(10, typeOptions);
    cy.findByPlaceholderText(/bevel/i).type(
      'Do butter knives have bevels?',
      typeOptions
    );
    cy.findByRole('button', { name: /add knife/i }).click();
  });

  it('re-fetches automatically and displays in the list', () => {
    cy.findByText(/butter knife/i)
      .scrollIntoView({ easing: 'linear', duration: 1000, timeout: 1000 })
      .should('be.visible');
    // cy.findByRole('button', { name: /delete knife/i }).last();
  });

  it('starts with an empty cart', () => {});

  it('adds knives to the cart', () => {
    cy.get('#knife-4')
      .scrollIntoView({ easing: 'linear', duration: 1000 })
      .click();
    cy.get('#knife-5').scrollIntoView().click();
    cy.get('#knife-6').scrollIntoView().click();
    cy.get('#knife-7').scrollIntoView().click();
    // cy.get('#knife-8')
    //   .scrollIntoView({ easing: 'linear', duration: 100 })
    //   .click();
    // cy.get('#knife-9')
    //   .scrollIntoView({ easing: 'linear', duration: 100 })
    //   .click();
  });

  it('displays the items in the cart with total price', () => {
    cy.get('#cartBtn')
      .scrollIntoView({ easing: 'linear', duration: 1000 })
      .click();
  });
  it('cart items persist with session after page reload', () => {});

  it('deletes items from the cart', () => {
    // cy.get('[id^=btn]').click({ multiple: true, force: true });
    cy.get(':nth-child(5) > .cart-delete-item > .MuiButton-root').click();
    cy.get(':nth-child(4) > .cart-delete-item > .MuiButton-root').click();
    cy.get(':nth-child(3) > .cart-delete-item > .MuiButton-root').click();
    cy.get(':nth-child(2) > .cart-delete-item > .MuiButton-root').click();
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
