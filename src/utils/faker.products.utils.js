import {faker} from '@faker-js/faker';

const generateMockProduct = () => {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        material: faker.commerce.productMaterial()
      
    };
}

export default generateMockProduct;