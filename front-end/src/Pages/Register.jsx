import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { registerRequest, setToken } from '../Utils/axios';
import verifyFields from '../Utils/verifyFields';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const isValid = !verifyFields(name, email, password);
    setIsDisabled(isValid);
    const loginBtn = document.getElementsByTagName('button')[0];
    if (!isValid) loginBtn.classList.remove('cursor-not-allowed');
  }, [name, email, password]);

  const handleRegister = async () => {
    const registerInfo = { name, email, password };

    try {
      const { message } = await registerRequest('/register', registerInfo);

      setToken(message.token);
      localStorage.setItem('user', JSON.stringify(message));

      return history.push('/customer/products');
    } catch (error) {
      return setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-div flex justify-center items-center place-self-center">
      <div className="bg-gray-100 p-6 login-width">
        <h1 className="text-center font-semibold text-4xl mb-8 text-amber-700">🍺 Beer Shop 🍺</h1>
        <form className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Nome"
              label="Nome"
              onChange={ ({ target: { value } }) => setName(value) }
              dataTestId="common_register__input-name"
              id="name-input"
              value={ name }
              labelClass="block text-sm font-semibold leading-6 text-gray-900"
              divClass="mt-2"
              inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              label="Email"
              onChange={ ({ target: { value } }) => setEmail(value) }
              dataTestId="common_register__input-email"
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
              dataTestId="common_register__input-password"
              id="password-input"
              value={ password }
              labelClass="block text-sm font-semibold leading-6 text-gray-900"
              divClass="mt-2"
              inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <Button
              onClick={ () => handleRegister() }
              text="Entrar"
              dataTestId="common_register__button-register"
              disabled={ isDisabled }
              buttonClass="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3 cursor-not-allowed"
            />
            <Button
              onClick={ () => history.push('/login') }
              text="Já tenho uma conta"
              disabled={ false }
              buttonClass="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </form>
        <div className="mt-8">
          {
            errorMessage && (
              <p data-testid="common_register__element-invalid_register">
                {errorMessage}
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Register;
