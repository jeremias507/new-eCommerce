import { useAuth } from "../context/auth.context"
import { CategoryList } from "../components/CategoryList"
import { BannerProduct } from "../components/BannerProduct"
export const Home = () => {

  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
    </div>
    
    
  )
}

