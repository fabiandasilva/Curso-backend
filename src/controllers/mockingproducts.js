const { generateMockProduct } = require("../utils/faker-mock");

exports.getAllMockingProducts = async (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 10; i++) {
            products.push(generateMockProduct());
        }
        return res.status(200).json({
            message: "Productos encontrados",
            data: products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
