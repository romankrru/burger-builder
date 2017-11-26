import React from 'react';

import Ingridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.css';

const Burger = (props) => {
  const transformedIngridients = (
    Object.keys(props.ingridients)
    .map((ingridientKey) => {
      return [...Array(props.ingridients[ingridientKey])].map((_, i) => {
        return <Ingridient key={ingridientKey + i} type={ingridientKey} />
      });
    })
  );

  return (
    <div className={styles.Burger}>
      <Ingridient type='bread-top' />
      {transformedIngridients}
      <Ingridient type='bread-bottom' />
    </div>
  );
};

export default Burger;