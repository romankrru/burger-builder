import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  }

  render() {
    return (
      <div className={styles.ContactData}>
        <input value={this.state.name} type="text" name="name" placeholder="Name" />
        <input value={this.state.email} type="email" name="email" placeholder="Email" />
        <input value={this.state.address.street} type="text" name="street" placeholder="Street" />
        <input value={this.state.address.postalCode} type="text" name="postal" placeholder="Postal code" />
        <Button>Order now</Button>
      </div>
    );
  }
}

export default ContactData;
