import PropTypes from 'prop-types';

function Button({ onClick, text, dataTestId,
  disabled, nameButton = 'button', buttonClass }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataTestId }
      disabled={ disabled }
      name={ nameButton }
      className={ buttonClass }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}.isRequired;

export default Button;
