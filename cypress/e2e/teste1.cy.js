describe('Testando com massa de teste JSON', () => {
    const testCases = [
        { nome: 'ProdutoTeste', preco: '1000', validade: '2021-12-31', description: 'Validade igual a 31/12/2021. Deve passar.' },
        { nome: 'ProdutoTeste', preco: '1000', validade: '2021-11-30', description: 'Validade anterior a 31/12/2021. Deve passar.' },
        { nome: 'ProdutoTeste', preco: '000', validade: '2021-12-31', description: 'Preço igual a 0. Deve passar.' },
        { nome: '', preco: '', validade: '', description: 'Todos os campos vazios. Deve falhar em todos os campos.' },
        { nome: 'ProdutoTeste', preco: '-1000', validade: '2021-12-31', description: 'Preço negativo. Deve falhar no campo preço.' },
        { nome: 'ProdutoTeste', preco: 'abc', validade: '2021-12-31', description: 'Preço com letras. Deve falhar no campo preço.' },
        { nome: 'ProdutoTeste', preco: '1000', validade: '2022-01-01', description: 'Validade maior que 31/12/2021. Deve falhar no campo validade.' },
        { nome: 'ProdutoTeste', preco: '1000', validade: '2021-12-32', description: 'Validade inválida (dia inexistente). Deve falhar no campo validade.' },
        { nome: 'ProdutoTeste', preco: '1000', validade: '2021-00-31', description: 'Validade inválida (mês inexistente). Deve falhar no campo validade.' },
        { nome: 'ProdutoTeste', preco: '1000', validade: '2021-12-00', description: 'Validade inválida (dia zero). Deve falhar no campo validade.' }
    ];

    testCases.forEach((testCase) => {
        it(testCase.description, () => {
            cy.visit('cypress/e2e/public/teste-1.html')
            cy.get('#inputNome').clear().type(testCase.nome)
            cy.get('#inputPreco').clear().type(testCase.preco)
            cy.get('#inputValidade').clear().type(testCase.validade)
            cy.get('.btn').click()
            cy.get(':nth-child(2) > .col-6 > .card > .card-body').screenshot()

            if (testCase.nome === '' || /\d/.test(testCase.nome)) {
                cy.get('#inputNome').should('have.class', 'is-invalid')
            }
            if (testCase.preco === '' || isNaN(testCase.preco) || parseFloat(testCase.preco) < 0) {
                cy.get('#inputPreco').should('have.class', 'is-invalid')
            }
            if (testCase.validade === '' || testCase.validade > '2021-12-31') {
                cy.get('#inputValidade').should('have.class', 'is-invalid')
            }   
            cy.wait(2000)
        })    
    })
})