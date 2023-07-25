import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { getUser, logout } from '../Utils/LocalStorage';

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);

    setUserRole(user.role);
    return setUserName(user?.name);
  }, []);

  return (
    <nav className="bg-blue-500 h-24">
      { isLogged && <Redirect to="/login" /> }
      <div className="h-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-evenly">
        <div className="flex h-16 w-4/12 items-center justify-between">
          {userRole === 'customer' && (
            <NavLink
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
              className="flex items-center justify-center bg-white  hover:bg-purple-700 hover:text-white h-3/4 w-2/4 mr-8 rounded-3xl text-lg"
            >
              Produtos
            </NavLink>
          )}
          { (userRole === 'customer' || userRole === 'seller') && (
            <NavLink
              to={ `/${userRole}/orders` }
              data-testid="customer_products__element-navbar-link-orders"
              className="flex items-center justify-center bg-white hover:bg-indigo-700 hover:text-white h-3/4 w-3/4 mr-8 rounded-3xl text-lg"
            >
              { userRole === 'customer' ? 'Meus Pedidos' : 'Pedidos' }
            </NavLink>
          )}
        </div>
        <div>
          <h1 className="text-center text-5xl text-white">Beer Shop</h1>
        </div>
        <div className="flex h-16 w-4/12 items-center justify-evenly">
          <div className="flex items-center justify-center bg-white h-3/4 w-2/4 rounded-3xl text-lg">
            <p
              data-testid="customer_products__element-navbar-user-full-name"
            >
              { userName }
            </p>
          </div>
          <NavLink
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logout() }
            className="flex items-center justify-center bg-white hover:bg-red-600 hover:text-white h-3/4 w-1/6 rounded-3xl text-lg"
          >
            Sair
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
