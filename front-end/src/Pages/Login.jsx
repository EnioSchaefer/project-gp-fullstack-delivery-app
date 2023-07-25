/* eslint-disable react-hooks/exhaustive-deps */
import React, { isValidElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { loginRequest, setToken } from '../Utils/axios';
import { getUser } from '../Utils/LocalStorage';
import verifyFields from '../Utils/verifyFields';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [toRegister, setToRegister] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLogged(true);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const isValid = !verifyFields(null, email, password);
    setIsDisable(isValid);
    const loginBtn = document.getElementsByTagName('button')[0];
    if (!isValid) loginBtn.classList.remove('cursor-not-allowed');
  }, [email, password]);

  const handleLogin = async () => {
    const loginInfo = {
      email,
      password,
    };
    try {
      const { message } = await loginRequest('/login', loginInfo);
      setToken(message.token);
      localStorage.setItem('user', JSON.stringify(message));
      const userget = getUser();
      setUserRole(userget.role);
      setIsLoading(false);
      return setIsLogged(true);
    } catch (error) {
      setIsIncorrectValues(true);
      return setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-div flex justify-center items-center place-self-center">
      {isLoading && !isLogged && <p>Carregando...</p>}
      {isLogged && userRole === 'customer' && <Redirect to="/customer/products" />}
      {isLogged && userRole === 'seller' && <Redirect to="/seller/orders" />}
      {isLogged && userRole === 'administrator' && <Redirect to="/admin/manage" />}

      <div className="bg-gray-100 p-6 login-width">
        <h1 className="text-center font-semibold text-4xl mb-8 text-amber-700">🍺 Beer Shop 🍺</h1>
        <form className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              label="Email"
              onChange={ ({ target: { value } }) => setEmail(value) }
              dataTestId="common_login__input-email"
              id="email-input"
              value={ email }
              labelClass="block text-sm font-semibold leading-6 text-gray-900"
              divClass="mt-2"
              inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="*******"
              label="Senha"
              onChange={ ({ target: { value } }) => setPassword(value) }
              dataTestId="common_login__input-password"
              id="password-input"
              value={ password }
              labelClass="block text-sm font-semibold leading-6 text-gray-900"
              divClass="mt-2"
              inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="h-20">
            <Button
              onClick={ handleLogin }
              text="Entrar"
              dataTestId="common_login__button-login"
              disabled={ isDisable }
              buttonClass="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3 cursor-not-allowed"
            />
            <Button
              onClick={ () => setToRegister(true) }
              text="Ainda não tenho conta"
              dataTestId="common_login__button-register"
              disabled={ false }
              buttonClass="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </form>
        <div className="mt-8">
          {
            isIncorrectValues
          && (
            <p data-testid="common_login__element-invalid-email" className="text-red-600">
              { errorMessage }
            </p>
          )
          }
        </div>
        {toRegister && <Redirect to="/register" />}
      </div>
    </div>
  );
}

export default Login;
