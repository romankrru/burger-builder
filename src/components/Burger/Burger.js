import React from 'react';

import Ingridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.css';

const Burger = (props) => {
  let transformedIngridients = (
    Object.keys(props.ingridients)
    .map((ingridientKey) => {
      return [...Array(props.ingridients[ingridientKey])].map((_, i) => {
        return <Ingridient key={ingridientKey + i} type={ingridientKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, [])
  );

  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please start adding ingridients!</p>
  }

  return (
    <div className={styles.Burger}>
      <Ingridient type='bread-top' />
      {transformedIngridients}
      <Ingridient type='bread-bottom' />
    </div>
  );
};

export default Burger;