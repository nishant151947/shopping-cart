// Headphones: price_1TokpqLFvfqrGEUFMrwEPkVm
// Laptop: price_1TokrkLFvfqrGEUFPzAubdMO
// Book: price_1Toks5LFvfqrGEUFKcZa2rGr
// T-Shirt : price_1ToksaLFvfqrGEUFAZ5htaE4
// Coffee: price_1ToktWLFvfqrGEUFRkGlLe4V


const ProductsArray = [
  {
    id: "price_1TokpqLFvfqrGEUFMrwEPkVm",
    title: "Headphones",
    price: 549,
  },
  {
    id: "price_1TokrkLFvfqrGEUFPzAubdMO",
    title: "Laptop",
    price: 54900,
  },
  {
    id: "price_1Toks5LFvfqrGEUFKcZa2rGr",
    title: "Book",
    price: 129,
  },
  {
    id: "price_1ToksaLFvfqrGEUFAZ5htaE4",
    title: "T-Shirt",
    price: 299,
  },
  {
    id: "price_1ToktWLFvfqrGEUFRkGlLe4V",
    title: "Coffee",
    price: 39,
  },
];

function getProductData(id) {
  let productData = ProductsArray.find((product) => product.id === id);

  if (productData == undefined) {
    console.log("no dat for ID: " + id);
    return undefined;
  }

  return productData;
}

export { ProductsArray, getProductData };
