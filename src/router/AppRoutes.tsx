import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/workspace/Home'
import NotFound from '../pages/errors/NotFound'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Home Route */}
        <Route path='/' element={<Home />} />
        
        {/* Catch-All Route: Matches any URL that doesn't match the ones above */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes