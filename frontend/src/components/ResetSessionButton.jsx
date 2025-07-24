import React from 'react';

const ResetSessionButton = ({ className }) => {
  const handleReset = () => {
    // Supprimer tous les cookies Laravel dans localhost
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Recharge proprement
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className={`bg-red-600 text-white px-4 py-2 rounded shadow ${className}`}
    >
      Réinitialiser la session
    </button>
  );
};

export default ResetSessionButton;
