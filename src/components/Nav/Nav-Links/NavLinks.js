import { Link } from 'react-router-dom';
import './NavLinks.css'

const NavLinks = () => {
    return ( 
            <nav className="nav__bottom__container">
                <div className="bottom__container">
                    <ul className="nav">
                        <li className='nav-link'><Link to="/">Home</Link></li> 
                        <li className='nav-link'><Link to="/category/teracotta_ornaments">Teracotta Ornaments</Link></li> 
                        <li className='nav-link'><Link to="/category/macrame_handicraft">Macrame Andicraft</Link></li> 
                        <li className='nav-link'><Link to="/category/moonj_handicraft">Moonj Handicraft</Link></li>
                        <li className='nav-link'><Link to="/category/banana_fiber">Banana Fiber</Link></li>
                        <li className='nav-link'><Link to="/category/jute_products">Jute Products</Link></li>
                    </ul>
                </div>
            </nav>
     );
}
 
export default NavLinks;