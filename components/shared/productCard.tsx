import React from 'react';

type ProductCardProps = {
  imageUrl: string;
  title: string;
  price: number;
  rating: number; // от 0 до 5
};

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, rating }) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-md overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">${price.toFixed(2)}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448 1.287 3.955c.3.921-.755 1.688-1.538 1.118L10 13.348l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.955-3.37-2.448c-.783-.57-.38-1.81.588-1.81h4.163L9.049 2.927z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
