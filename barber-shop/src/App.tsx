import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './modules/home/Home';
import Navbar from './layout/navbar/Navbar';


function App() {


  return (
    <Router>
     <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
</Router>
  )
}

export default App
