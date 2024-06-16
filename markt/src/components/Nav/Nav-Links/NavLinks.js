import { Link } from 'react-router-dom';
import './NavLinks.css'

const NavLinks = () => {
    return ( 
            <nav className="nav__bottom__container">
                <div className="bottom__container">
                    <ul className="nav">
                    <li className='nav-link'><Link to="/">Home</Link></li> 
                        <li className='nav-link'><Link to="/category/teracotta">Teracotta</Link></li> 
                        <li className='nav-link'><Link to="/category/macrame">Macrame </Link></li> 
                        <li className='nav-link'><Link to="/category/moonj">Moonj</Link></li>
                        <li className='nav-link'><Link to="/category/banana">Banana</Link></li>
                        <li className='nav-link'><Link to="/category/jute">Jute</Link></li>
                    </ul>
                </div>
            </nav>
     );
}
 
export default NavLinks;