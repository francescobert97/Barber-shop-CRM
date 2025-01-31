import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './modules/home/Home';
import Navbar from './layout/navbar/Navbar';
import Customers from './modules/customers/Customers';


function App() {


  return (
    <Router>
     <Navbar/>
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers-information" element={<Customers singleType='all'/>} />
          <Route path="/upselling-customers" element={<Customers singleType='all' mode="Upselling"/>} />
          <Route path="/zombie" element={<Customers singleType='bad'/>} />
        </Routes>
      </main>
</Router>
  )
}

export default App
