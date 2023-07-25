import React from 'react';
import Navbar from '../Components/Navbar';

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col p-10 w-4/12 mt-24">
          <h1 className="place-self-center mb-4 bg-red-700 text-white rounded-full p-4">
            404 NOT FOUND
          </h1>
          <p className="place-self-center bg-red-600 text-white rounded-full p-4">A página que você procura não foi encontrada</p>
          <a href="/" className="place-self-center mt-4 bg-green-600 hover:bg-green-400 text-white rounded-full p-3">Voltar ao início</a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
