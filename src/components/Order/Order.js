import React from 'react';
import PropTypes from 'prop-types';

import styles from './Order.css';

const Order = (props) => {
  const ingridients = [];

  Object.keys(props.ingridients).forEach((inngridientKey) => {
    ingridients.push({
      name: inngridientKey,
      amount: props.ingridients[inngridientKey],
    });
  });

  const orderInfo = ingridients.map(ingridient => (
    <span
      key={ingridient.name}
      style={{
        display: 'inline-block',
        margin: '5px',
        padding: '5px',
        border: '1px solid #ccc',
        textTransform: 'capitalize',
      }}
    >
      {ingridient.name} ({ingridient.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>
        Order: {orderInfo}
      </p>
      <p>
        Price <strong>USD {Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};


Order.propTypes = {
  price: PropTypes.string.isRequired,
  ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Order;
