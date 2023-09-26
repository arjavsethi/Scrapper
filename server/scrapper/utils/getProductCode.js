const getProductCode = (url) => {

    const pattern = /dp\/([A-Z0-9]+)/;
    const matches = url.match(pattern);
    const productCode = matches ? matches[1] : null;
    return productCode;
}
module.exports = getProductCode;