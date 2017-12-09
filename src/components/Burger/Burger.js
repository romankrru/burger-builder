import React from 'react';
import PropTypes from 'prop-types';

import Ingridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.css';

const Burger = (props) => {
  let transformedIngridients = (
    Object.keys(props.ingridients)
      .map(ingridientKey => [...Array(props.ingridients[ingridientKey])].map((_, i) => (
        <Ingridient key={ingridientKey + i} type={ingridientKey} />
      )))
      .reduce((arr, el) => arr.concat(el), [])
  );

  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please start adding ingridients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <Ingridient type="bread-top" />
      {transformedIngridients}
      <Ingridient type="bread-bottom" />
    </div>
  );
};

Burger.defaultProps = {
  ingridients: null,
};

Burger.propTypes = {
  ingridients: PropTypes.objectOf(PropTypes.number),
};

export default Burger;
