import { Link } from "react-router-dom";

const SideNav = () => (
  <div className='side-nav col-md-3 col-lg-2 d-md-block bg-light sidebar'>
    <ul className='navbar-nav flex-column px-3  text-center'>
      <li className='nav-item'>
        <Link to='/admin/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/admin/category' className='nav-link'>
          Category
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/admin/product' className='nav-link'>
          Products
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/admin/orders' className='nav-link'>
          Orders
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/profile' className='nav-link'>
          Profile
        </Link>
      </li>
    </ul>
  </div>
);
export default SideNav;
