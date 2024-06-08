import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/app_compnents/Common/NavBar'
import Footer from './components/app_compnents/Common/Footer'

function App() {

  const location = useLocation()
  const isHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
  
  return (
    <div>
    {isHeaderFooter || <NavBar/>}
      <div>
        <Outlet/>
      </div>
      {isHeaderFooter || <Footer/>}
    </div>
  )
}

export default App
