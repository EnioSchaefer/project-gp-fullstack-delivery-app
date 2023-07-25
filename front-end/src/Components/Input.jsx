import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, label, placeholder, id,
  dataTestId, onChange, value, labelClass, divClass, inputClass }) {
  return (
    <>
      <label htmlFor={ id } className={ labelClass }>
        {label}
      </label>
      <div className={ divClass }>
        <input
          type={ type }
          placeholder={ placeholder }
          data-testid={ dataTestId }
          onChange={ onChange }
          id={ id }
          value={ value }
          name={ id }
          className={ inputClass }
        />
      </div>
    </>
  );
}

Input.propTypes = {
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

export default Input;
