import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, walletAction, saveWallet, getTotal } from '../actions';

const ALIMENTACAO = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      exchangeRates: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
    // exchangeRates();
  }

  async handleclick() {
    const { id } = this.state;
    const { save, teste, currencies } = this.props;
    await currencies();
    this.setState({
      exchangeRates: teste,
    });
    await save(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      exchangeRates: [],
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      value, description,
      method, tag } = this.state;
    const { userEmail, teste, userExpences, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <header>
          <p
            data-testid="email-field"
          >
            {userEmail}
          </p>
          <p data-testid="total-field">
            { userExpences }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>

        </header>
        <label htmlFor="valordespesa">
          valor da despesa
          <input
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            type="number"
          />
        </label>
        <label htmlFor="descrição">
          descrição da despesa
          <input
            value={ description }
            onChange={ this.handleChange }
            name="description"
            data-testid="description-input"
            type="text"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            name="currency"
            onChange={ this.handleChange }
            id="moeda"
            data-testid="currency-input"
          >
            { Object.keys(teste).map((x) => (
              <option
                value={ x }
                data-testid={ x }
                key={ x }
              >
                {' '}
                { x }
              </option>)) }
          </select>
        </label>
        <select
          onChange={ this.handleChange }
          value={ method }
          data-testid="method-input"
          name="method"
        >
          <option value="Dinheiro">Dinheiro </option>
          <option value="Cartão de crédito">Cartão de crédito </option>
          <option value="Cartão de débito">Cartão de débito </option>
        </select>
        <select
          onChange={ this.handleChange }
          name="tag"
          value={ tag }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          onClick={ this.handleclick }
          type="button"
        >
          Adicionar despesa
        </button>
        <form>
          <table>
            <thead>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </thead>
            <tbody>
              {expenses.map((x) => (
                <tr key={ x.id }>
                  <td>
                    { x.description}
                  </td>
                  <td>
                    { x.tag}
                  </td>
                  <td>
                    { x.method }
                  </td>
                  <td>
                    { x.value}
                  </td>
                  <td>
                    {x.exchangeRates[x.currency].name }
                  </td>
                  <td>
                    {Number(x.exchangeRates[x.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    { (Number(x.value)
                     * Number(x.exchangeRates[x.currency].ask)).toFixed(2)}
                  </td>
                  <td>
                    {x.exchangeRates[x.currency].name}
                  </td>
                  <td>
                    Real
                  </td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // exchangeRates: (exchangeRates) => dispatch(fetchExchanges(exchangeRates)),
    currencies: (currencies) => dispatch(fetchAPI(currencies)),
    wallet: (state) => dispatch(walletAction(state)),
    save: (state) => dispatch(saveWallet(state)),
    total: (state) => dispatch(getTotal(state)),
  };
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  teste: state.wallet.currencies,
  save: state.stado,
  totalzao: state.wallet.getTotal,
  userExpences: state.wallet.expenses.reduce((acc, curr) => {
    acc += curr.value * curr.exchangeRates[curr.currency].ask;
    return acc;
  }, 0),
  expenses: state.wallet.expenses,

});

Wallet.propTypes = {
  userEmail: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  teste: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
  userExpences: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
