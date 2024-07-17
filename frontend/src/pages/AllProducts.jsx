import { UploadProduct } from "../components/UploadProduct";
import { useEffect, useState } from "react";
import { AllProductRequest } from "../api";
import { toast } from "react-toastify";
import { ProductCard } from "../components/ProductCard";

export const AllProducts = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const res = await AllProductRequest();
      if (res.data.success) {
        setAllProduct(res.data.data || []);
      }
    } catch (error) {
      toast.error("Network Error", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProducts(true)}
        >
          Upload Product
        </button>
      </div>

      {/**All Product */}

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none ">
        {allProduct.map((item, index) => {
          return <ProductCard data={item} key={index} fetchAllProduct={fetchAllProduct}  />;
        })}
      </div>

      {/**upload prouct component */}
      {openUploadProducts && (
        <UploadProduct
          onClose={() => setOpenUploadProducts(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};
