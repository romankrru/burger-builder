import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.css';

class BurgerIngridient extends Component {
  render() {
    let ingridient = null;

    switch (this.props.type) {
      case 'bread-bottom':
        ingridient = <div className={styles.BreadBottom} />;
        break;
      case 'bread-top':
        ingridient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1} />
            <div className={styles.Seeds2} />
          </div>
        );
        break;
      case 'meat':
        ingridient = <div className={styles.Meat} />;
        break;
      case 'cheese':
        ingridient = <div className={styles.Cheese} />;
        break;
      case 'salad':
        ingridient = <div className={styles.Salad} />;
        break;
      case 'bacon':
        ingridient = <div className={styles.Bacon} />;
        break;
      default:
        ingridient = null;
    }

    return ingridient;
  }
}

BurgerIngridient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngridient;
