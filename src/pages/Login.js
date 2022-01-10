import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  buttonClick() {
    const { user } = this.props;
    const { email } = this.state;
    user(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, senha, redirect } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const VALID_PASSWORD = 6;

    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <label
          htmlFor="email
      "
        >
          Email:
          <input
            value={ email }
            onChange={ this.handleChange }
            name="email"
            data-testid="email-input"
            typeof="text"
          />
        </label>

        <label
          htmlFor="password"
        >
          Senha:
          <input
            value={ senha }
            onChange={ this.handleChange }
            name="senha"
            data-testid="password-input"
            type="password"
          />
        </label>

        <button
          type="button"
          onClick={ this.buttonClick }
          disabled={ !(senha.length >= VALID_PASSWORD && validEmail) }
          typeof="button"
        >
          Entrar
        </button>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    user: (email) => dispatch(userAction(email)),
  };
}
Login.propTypes = {
  user: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
