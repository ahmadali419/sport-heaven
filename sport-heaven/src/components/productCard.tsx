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
    <div
      className="product-card bg-green"
      style={{
        /* Your inline CSS styles here */
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginRight:'10px'
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          /* Styles for the image */
          width: "100%",
          height: "auto",
        }}
      />
      <h3
        style={{
          /* Styles for the product name */
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {product.name}
      </h3>
      <p
        style={{
          /* Styles for the product description */
          fontSize: "16px",
        }}
      >
        {product.description}
      </p>
      <div
        className="price"
        style={{
          /* Styles for the price */
          fontSize: "20px",
          color: "green",
        }}
      >
        ${product.price}
      </div>
      
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
    // Add more product objects as needed
  ];

  return (
    <div className="product-listing" style={{ display:'flex' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
