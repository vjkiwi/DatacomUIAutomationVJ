describe("UI Automation DemoBNZ website", () => {

  beforeEach("TC1: Verify you can navigate to Payees page using the navigation menu", () => {
    cy.visit('https://www.demo.bnz.co.nz/client')
    cy.url().should('eq', 'https://www.demo.bnz.co.nz/client')
    cy.title().should('include', 'Internet Banking')
    //1. Click ‘Menu’
    cy.get('.Icons--hamburguerMenu').should('be.visible')
    cy.get('.Icons--hamburguerMenu').click()
    //2. Click ‘Payees’
    cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').should('have.text', 'payees')
    cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').click()
    //3. Verify Payees page is loaded
    cy.get('span.Language__container:nth-child(2)').contain('payees')

  });
  //ADD Payees
  it("TC2: Verify you can add new payee in the Payees page", function () {
    //2. Click ‘Payees’
    cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').should('have.text', 'payees')
    cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').click()
    //3. Verify Payees page is loaded
    //1. Navigate to Payees page
    cy.get('span.Language__container:nth-child(2)').contain('payees')
    //Add Payee    
    cy.get('.js-add-payee').click()
    cy.get('#ComboboxInput-apm-name').type('ANCHOR CITY')
    cy.get('#ComboboxInput-apm-name').should('have.value', 'ANCHOR CITY')
    cy.get('.existing-company').should('be.visible',)
    cy.get('//*[@id="apm-account"]').should('have.value', '0142282')
    cy.get('.js-submit').click()

    //Confirmation message "payee has been added"
    let confirmation = "PAYEE ADDED";

    cy.get('.message').then((x) => {
      let actmessage = x.text()
      expect(actmessage).to.eqqual(confirmation)
    });

    it("TC3: Verify payee name is a required field", function () {
      //2. Click ‘Payees’
      cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').should('have.text', 'payees')
      cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').click()
      //3. Verify Payees page is loaded
      //1. Navigate to Payees page
      cy.get('span.Language__container:nth-child(2)').contain('payees')

      //2. Click ‘Add’ button
      cy.get('.js-add-payee').click()
      //3. Click ‘Add’ button
      cy.get('.js-submit').click()
      //4. Validate errors - warning message to enter required filed
      cy.get('p.text').should('have.text', 'A problem was found. Please correct the field highlighted below.')
      cy.get('#ComboboxInput-apm-name').type('ANZ VISA')
      cy.get('#ComboboxInput-apm-name').should('have.value', 'ANZ VISA')
      cy.get('.existing-company').should('be.visible',)
      cy.get('//*[@id="apm-account"]').should('have.value', '0000022')
    });

    it('TC4: Verify that payees can be sorted by name', function () {
      //2. Click ‘Payees’
      cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').should('have.text', 'payees')
      cy.get('.js-main-menu-payees > a:nth-child(1) > span:nth-child(2)').click()
      //3. Verify Payees page is loaded
      //1. Navigate to Payees page
      cy.get('span.Language__container:nth-child(2)').contain('payees')
      //Name sorting   
      cy.get('.js-payee-name-column').click
      cy.get('#js-payee-item-10000023 > div:nth-child(1) > div:nth-child(1) > p:nth-child(2) > span:nth-child(1)').contain('ANCHOR CITY')
      cy.get('.js-payee-name-column').click
      cy.get('/html/body/div[2]/div/div/div[3]/section/section/div/ul/li[1]/div/div/div[1]/div/p[1]/span[1]').contain('VODAFONE NZ LTD (MOBILE)')
    });

    it('TC5: Navigate to Payments page', function () {
      cy.get('.Icons--hamburguerMenu').should('be.visible')
      cy.get('.Icons--hamburguerMenu').click()

      cy.get('.js-main-menu-paytransfer > button:nth-child(1) > span:nth-child(2)').contain('Pay or Transfer')

      cy.get('.js-main-menu-paytransfer > button:nth-child(1) > span:nth-child(2)').click()

      cy.get('div.container-1-1-33:nth-child(1) > button:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').click()
      cy.get('.list-1-1-72 > li:nth-child(2) > button:nth-child(1)').click()
      //select everyday account
      cy.get('.list-1-1-59 > li:nth-child(2) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
      cy.get('.list-1-1-59 > li:nth-child(2) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').should('exist')
      cy.get('.name-1-1-36 > span:nth-child(1)').click()
      //select accounts
      cy.get('#react-tabs-8').click()
      cy.get('#react-tabs-8').should('have.value', 'Accounts')
      //Bills acccount
      cy.get('.list-1-1-76 > li:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
      cy.get('div.container-1-1-29:nth-child(2) > button:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)').should('be.visible')

      cy.get('/html/body/div[7]/div/div/div/div/div[1]/div/div[1]/button/div/div/div[2]/p/span').should('be.visible',)
      //Tranfer $500
      cy.get('#field-bnz-web-ui-toolkit-11').should('exist')
      cy.get('#field-bnz-web-ui-toolkit-11').type('500.00')
      cy.get('button.Button-component-0-11__002e1__002e0:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)').click()

      let transfer = "Transfer successful";

      cy.get('.message').then((x) => {
        let actmessage = x.text()
        expect(actmessage).to.eqqual(transfer)
      });
    })
  })
})