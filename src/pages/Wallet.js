import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <p
            data-testid="email-field"
          >
            {userEmail}
          </p>
          <p data-testid="total-field">
            0

          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>

        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, null)(Wallet);
