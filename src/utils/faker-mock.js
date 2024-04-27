const { faker } = require('@faker-js/faker');

 

const generateMockProduct = () => {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription()
    };
}

module.exports = {
    generateMockProduct
}
