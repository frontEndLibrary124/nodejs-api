const Products = require('../models/product.model');
const {
    getPostData
} = require('../utils');

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(products));
    } catch (err) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const getProduct = async (req, res, id) => {
    try {
        const product = await Products.findById(id);

        if (product) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: 'product not found'
            }));
        }
    } catch (err) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const createProduct = async (req, res) => {
    try {
        const body = await getPostData(req);
        const {
            id,
            name,
            quantity,
            price
        } = JSON.parse(body);
        const product = {
            id,
            name,
            quantity,
            price
        };

        const newProduct = await Products.create(product);

        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify(newProduct));
    } catch (err) {
        console.log(err);
    }
}

const updateProduct = async (req, res, id) => {
    try {
        const product = await Products.findById(id);

        if (product) {
            const body = await getPostData(req);
            const {
                name,
                quantity,
                price
            } = JSON.parse(body);

            const productData = {
                name: name || product.name,
                quantity: quantity || product.quantity,
                price: price || product.price
            }

            const updatedProduct = await Products.update(id, productData);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            return res.end(JSON.stringify(updatedProduct));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: 'product not found!'
            }));
        }

    } catch (err) {
        console.log(err);
    }
}

const deleteProduct = async (req, res, id) => {
    try {
        const product = await Products.findById(id);

        if (product) {
            await Products.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: 'product removed!'
            }));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(product));
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};