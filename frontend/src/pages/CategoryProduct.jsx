import { useParams } from 'react-router-dom'

export const CategoryProduct = () => {
const params = useParams()
  return (
    <div>
        {params.categoryName} 
    </div>
  )
}
