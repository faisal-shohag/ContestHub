import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/app_compnents/Common/NavBar'
import Footer from './components/app_compnents/Common/Footer'
import Splash from './components/app_compnents/Common/Splash';
import useAuth from './hooks/useAuth';
import MobileNav from './components/app_compnents/Common/MobileNav';

function App() {
  const { loading } = useAuth();

  const location = useLocation()
  const isHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
  
  return (
    <div>
      <div className="block lg:hidden md:hidden">
  <MobileNav />
</div>
    {isHeaderFooter || <NavBar/>}
      <div>
        {loading && <Splash/>}
        <Outlet/>
      </div>
      {isHeaderFooter || <Footer/>}
    </div>
  )
}

export default App
