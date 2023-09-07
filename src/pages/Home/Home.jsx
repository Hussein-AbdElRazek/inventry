import { Box } from "@mui/material"
import { Route, Routes } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import Products from '../Products/Products'
import TabsBar from '../../components/TabsBar'
import LimitedProducts from '../LimitedProdcuts/LimitedProducts'

const Home = () =>
{

  return (
    <div>
      <Navbar />
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

        </Routes>
      </Box>

    </div>
  )
}

export default Home