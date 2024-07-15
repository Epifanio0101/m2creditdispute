import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) {
      return 'weak';
    } else if (password.length > 10) {
      return 'strong';
    } else if (password.length > 6) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div>
      <p>Password strength: {strength}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
