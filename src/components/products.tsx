import React from "react";

// Define an interface for the Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card bg-green border rounded-md border-gray-300 p-10 mr-5">
      <a href="/product">
      <img src={product.image} alt={product.name} className="w-full h-auto" />
      <h3 className="text-xl font-bold mt-2">{product.name}</h3>
      <p className="text-base mt-2">{product.description}</p>
      <div className="price text-green text-2xl mt-2">${product.price}</div>
      </a>
    </div>
  );
};

const ProductListing = () => {
  // Example product data
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: 19.99,
      image: "/images/football.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: 24.99,
      image: "/images/football.jpeg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      price: 29.99,
      image: "/images/images.jpeg",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description for Product 3",
      price: 29.99,
      image: "/images/images.jpeg",
    },
    {
      id: 5,
      name: "Product 4",
      description: "Description for Product 3",
      price: 29.99,
      image: "/images/images.jpeg",
    },
    {
      id: 6,
      name: "Product 4",
      description: "Description for Product 3",
      price: 29.99,
      image: "/images/images.jpeg",
    },
    // Add more product objects as needed
  ];

  const brands = ["All Brands", "Brand X", "Brand Y"];
  const priceRanges = ["All Prices", "$0 - $50", "$50 - $100", "$100+"];

  const categories = ["All Categories", "Category A", "Category B"];

  return (
    <div className="product-listing mt-5 flex">
      <div className="filters p-5 " style={{ overflowY: "auto", maxHeight: "70vh",width:'50%' }}>
        <h2>Filters</h2>
        <div className="mb-4">
          <select
            id="category"
            name="category"
            style={{ width: '89%' }}
            className="form-select px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400 text-gray-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="brand"
            name="brand"
            style={{ width: '89%' }}
            className="form-select px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400 text-gray-700"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="priceRange"
            style={{ width: '89%' }}
            name="priceRange"
            className="form-select px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400 text-gray-700"
          >
            {priceRanges.map((priceRange) => (
              <option key={priceRange} value={priceRange}>
                {priceRange}
              </option>
            ))}
          </select>
          <button
            style={{ width: '70%' }}
            className="bg-blue-500 text-white mt-3 px-4 py-2 rounded-md hover:bg-blue-600 text-center"
          >
            Apply Filters
          </button>
        </div>
        <div className="mb-4">
          {/* Add pagination controls here */}
        </div>
      </div>
      <div className="products flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
