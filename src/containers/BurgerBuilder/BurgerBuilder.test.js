import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
  adapter: new Adapter(),
});


describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder
      isAuthenticated={false}
      onPurchaseBurgerInit={() => {}}
      error={false}
      onIngredientInited={() => { }}
      price={0}
      history={{}}
      onIngridientAdded={() => { }}
      onIngridientRemoved={() => { }}
    />);
  });

  it('should render <BuildControls /> if props.ings passed', () => {
    wrapper.setProps({
      ings: { slad: 0 },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
