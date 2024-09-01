import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GiftShopLayout from './Layout';

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiftShopLayout />}></Route>
        
     
      </Routes>
    </Router>
  );
}

export default MyRouter;
