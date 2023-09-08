import { Box } from "@mui/material"
import { Navigate, Route, Routes } from 'react-router-dom'

import Products from '../Products/Products'
import TabsBar from '../../components/TabsBar'
import LimitedProducts from '../LimitedProdcuts/LimitedProducts'

const Home = () =>
{

  return (
    <Box
      component="main"
      sx={{ flexGrow: 2, pt: 10 }}
    >
      <TabsBar />
      <Routes>
        <Route
          index
          element={<Products />}
        />
        <Route path='all-products' element={<Products />} />;
        <Route path='limited-products' element={<LimitedProducts />} />;
        <Route path="*" element={<Navigate to="/" replace={true} />} />

      </Routes>
    </Box>
  )
}

export default Home