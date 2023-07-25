import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { adminDeleteUser, adminGetUsers } from '../Utils/axios';
import Button from './Button';

function AdminUserList({ userList, setUserList }) {
  useEffect(() => {
    const requestUsers = async () => {
      const users = await adminGetUsers('/admin/users');
      return setUserList(users);
    };
    requestUsers();
  }, [setUserList]);

  const convertRole = (role) => {
    switch (role) {
    case 'customer': return 'Cliente';
    case 'seller': return 'P. Vendedora';
    case 'administrator': return 'P. Administradora';
    default: return 'Desconhecido';
    }
  };

  const deleteUser = async (userId) => {
    await adminDeleteUser(`/admin/delete/${userId}`);
    const newUserList = userList.filter((user) => user.id !== userId);
    setUserList(newUserList);
  };

  if (!userList) return <p>Carregando usuários...</p>;
  return (
    <div>
      <h2 className="text-center font-semibold text-3xl mb-2 mt-6">Lista de usuários</h2>
      {
        userList.length === 0 ? <p>Não há usuários cadastrados</p>
          : (
            <div className="flex justify-center w-full">
              <div className="py-3">
                <table className="border-2 shadow">
                  <thead className="bg-white border-b">
                    <tr>
                      <th className="font-medium text-gray-900 px-6 py-4 text-center">ID</th>
                      <th className="font-medium text-gray-900 px-6 py-4 text-center">Nome</th>
                      <th className="font-medium text-gray-900 px-6 py-4 text-center">Email</th>
                      <th className="font-medium text-gray-900 px-6 py-4 text-center">Tipo</th>
                      <th className="font-medium text-gray-900 px-6 py-4 text-center">Excluir</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {userList.map((user, i) => (
                      <tr key={ user.id }>
                        <td
                          data-testid={ `admin_manage__element-user-table-item-number-${i}` }
                          className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-center bg-gray-100"
                        >
                          {i + 1}
                        </td>
                        <td
                          data-testid={ `admin_manage__element-user-table-name-${i}` }
                          className="text-gray-900 font-light px-6 py-4 whitespace-nowrap bg-white"
                        >
                          {user.name}
                        </td>
                        <td
                          data-testid={ `admin_manage__element-user-table-email-${i}` }
                          className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                        >
                          {user.email}
                        </td>
                        <td
                          data-testid={ `admin_manage__element-user-table-role-${i}` }
                          className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-white"
                        >
                          {convertRole(user.role)}
                        </td>
                        <td
                          data-testid={ `admin_manage__element-user-table-remove-${i}` }
                          className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                        >
                          <button
                            onClick={ () => deleteUser(user.id) }
                            disabled={ false }
                            className="w-20 h-8 text-white bg-red-600 rounded-full baseline hover:bg-red-500"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
      }
    </div>
  );
}

AdminUserList.propTypes = {
  userList: PropTypes.array,
  setUserList: PropTypes.func,
}.isRequired;

export default AdminUserList;
