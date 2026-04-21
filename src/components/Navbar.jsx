import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav>
      <Link className={isActive('/')} to="/">Home</Link>
      <Link className={isActive('/favorites')} to="/favorites">Favorites</Link>
      <Link className={isActive('/stats')} to="/stats">Stats</Link>
    </nav>
  );
};

export default Navbar;