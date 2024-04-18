/**
 * Validates a product object, checking for required fields and their formats.
 *
 * @param {object} product - The product object to be validated.
 * @param {string} product.title - The product title (required, 10-80 characters).
 * @param {string} product.description - The product description (required, 10-900 characters).
 * @param {string} product.imageURL - The product image URL (required, valid URL format).
 * @param {string} product.price - The product price (optional, valid numeric value).
 *
 * @returns {object} An object containing validation errors, with empty strings if no errors are found.
 * @property {string} errors.title - Error message related to the product title (empty string if valid).
 * @property {string} errors.description - Error message related to the product description (empty string if valid).
 * @property {string} errors.imageURL - Error message related to the product image URL (empty string if valid).
 * @property {string} errors.price - Error message related to the product price (empty string if valid).
 */

export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  } = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = 'Product title must be between 10 and 80 characters!';
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = 'Product description must be between 10 and 900 characters!';
  }
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = 'Valid Image URL is required';
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = 'Valid price is required';
  }
  if (product.colors.length < 1) {
    errors.colors = 'you must provide at least 1 color';
  }
  return errors;
};
