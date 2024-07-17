import { MdModeEditOutline } from "react-icons/md";
import { AdminEditProduct } from "./AdminEditProduct";
import { useState } from "react";
import { displayINRCurrency } from "../helpers/displayCurrency";

export const ProductCard = ({ data, fetchAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded flex justify-center items-center  '>
       <div className='w-40 mx-auto text-left'>
            <div className='w-32 h-32 mx-auto '>
              <img src={data?.productImage[0]}  className='mx-auto object-contain h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchAllProduct={fetchAllProduct}/>
          )
        }
    
    </div>
  )
};
