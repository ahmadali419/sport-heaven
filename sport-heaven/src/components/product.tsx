import React from "react";

// Define an interface for the Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  reviews: Review[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <img
              src={product.images[0]}
              alt={`Product ${product.id}`}
              className="w-full h-auto"
            />
          </div>
          <div className="flex">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="w-1/4 cursor-pointer hover:opacity-75"
              >
                <img src={image} alt={`Product ${product.id}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <div className="text-2xl font-semibold mb-4">${product.price}</div>
          <button
            style={{ width: '70%' }}
            className="bg-blue-500 text-white mt-3 px-4 py-2 rounded-md hover:bg-blue-600 text-center"
          >
            Add to cart
          </button>
          {/* <h2 className="text-xl font-semibold mb-2">Product Reviews</h2> */}
          {/* <ul>
            {product.reviews.map((review) => (
              <li key={review.id} className="mb-2">
                <div className="text-lg font-semibold mb-1">{review.user}</div>
                <div className="text-gray-600">{`Rating: ${review.rating}`}</div>
                <div className="text-gray-700">{review.comment}</div>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  // Example product data
  const product: Product = {
    id: 1,
    name: "Product 1",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    price: 199.99,
    images: [
      "/images/football.jpeg",
      "/images/images.jpeg",
      "/images/football.jpeg",
    ],
    reviews: [
      {
        id: 1,
        user: "User 1",
        rating: 5,
        comment: "Great product!"
      },
      {
        id: 2,
        user: "User 2",
        rating: 4,
        comment: "Good quality."
      },
    ],
  };

  return (
    <div className="product-detail-page">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
