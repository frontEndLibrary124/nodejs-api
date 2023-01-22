let products = require('../data/products.json');
const {
    writeDataToFile
} = require('../utils');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    });
}

const create = (product) => {
    return new Promise((resolve, reject) => {
        products.push(product);
        writeDataToFile('./data/products.json', products);
        resolve(product);
    });
}

const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        products[index] = {
            id,
            ...product
        };
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        products = products.filter((product) => product.id !== id);
        writeDataToFile('./data/products.json', products);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};