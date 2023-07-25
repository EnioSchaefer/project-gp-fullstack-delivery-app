import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { adminRegister } from '../Utils/axios';
import verifyFields from '../Utils/verifyFields';
import Button from './Button';
import Input from './Input';

function AdminRegister({ userList, setUserList }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsDisabled(!verifyFields(name, email, password));
  }, [name, email, password]);

  const handleRegister = async () => {
    const newUserInfo = { name, email, password, role };

    try {
      const newUser = await adminRegister('/admin/register', newUserInfo);
      setUserList([...userList, newUser]);
    } catch ({ response: { data } }) {
      return setErrorMessage(data);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center bg-gray-200 w-8/12 p-6">
        <h2 className="text-center font-semibold text-3xl mb-2">Cadastrar novo usuário</h2>
        <div>
          <form className="space-y-6">
            <div className="flex justify-center mt-2">
              <Input
                type="text"
                placeholder="Nome"
                label="Nome"
                onChange={ ({ target: { value } }) => setName(value) }
                dataTestId="admin_manage__input-name"
                id="name-input"
                value={ name }
                labelClass="mr-6 block place-self-center font-semibold leading-6 text-gray-900"
                divClass="mt-2"
                inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex justify-center mt-2">
              <Input
                type="email"
                placeholder="email@email.com"
                label="Email"
                onChange={ ({ target: { value } }) => setEmail(value) }
                dataTestId="admin_manage__input-email"
                id="email-input"
                value={ email }
                labelClass="mr-6 block place-self-center font-semibold leading-6 text-gray-900"
                divClass="mt-2"
                inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex justify-center mt-2">
              <Input
                type="password"
                placeholder="*******"
                label="Senha"
                onChange={ ({ target: { value } }) => setPassword(value) }
                dataTestId="admin_manage__input-password"
                id="password-input"
                value={ password }
                labelClass="mr-6 block place-self-center font-semibold leading-6 text-gray-900"
                divClass="mt-2"
                inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex justify-center mt-2">
              <label htmlFor="userRoleSelect" className="block place-self-center font-semibold leading-6 text-gray-900 mr-6">
                Tipo
              </label>
              <div className="mt-2">
                <select
                  name="userRoleSelect"
                  id="userRoleSelect"
                  data-testid="admin_manage__select-role"
                  onChange={ ({ target: { value } }) => setRole(value) }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="seller">Vendedor</option>
                  <option value="customer">Cliente</option>
                  <option value="administrator">Administrador</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center align-center">
          <Button
            onClick={ () => handleRegister() }
            text="Cadastrar"
            dataTestId="admin_manage__button-register"
            disabled={ isDisabled }
            buttonClass="place-self-center mt-5 bg-green-600 hover:bg-green-400 text-white rounded-full p-3 w-3/12"
          />
        </div>
        {
          errorMessage && (
            <p data-testid="admin_manage__element-invalid-register">
              {errorMessage}
            </p>
          )
        }
      </div>
    </div>
  );
}

AdminRegister.propTypes = {
  userList: PropTypes.array,
  setUserList: PropTypes.func,
}.isRequired;

export default AdminRegister;
