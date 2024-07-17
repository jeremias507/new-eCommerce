import { useEffect } from "react";
import { categoryProductRequest } from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(12).fill(null);

  const fetchCategory = async () => {
    setLoading(true);
    const response = await categoryProductRequest();
    if (response.data.success) {
      setLoading(false);
      setCategoryProduct(response.data.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((item, index) => (
              <div
                key={index}
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-300 animate-pulse"
              ></div>
            ))
          : categoryProduct.map((product, index) => (
              <Link
                key={index}
                to={`/product-category/${product.category}`}
                className="cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-fill"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};
