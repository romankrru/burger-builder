import React from 'react';

import Ingridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.css';

const Burger = (props) => {
  return (
    <div className={styles.Burger}>
      <Ingridient type='bread-top' />
      <Ingridient type='salad' />
      <Ingridient type='cheese' />
      <Ingridient type='meat' />
      <Ingridient type='bread-bottom' />
    </div>
  );
};

export default Burger;