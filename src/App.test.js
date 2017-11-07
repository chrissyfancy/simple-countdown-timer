import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;

console.error = message => {
   throw new Error(message);
};

it('should render the App component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('should render the initial state', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state()).toEqual({ startTime: 0, endTime: 0, countdownTimer: 0, errors: [] })
});

it('should include the following text', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.text()).toEqual("Simple Countdown TimerStart TimeEnd TimeStart CountdownSeconds Remaining:0")
});

it('should have the submit button', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('button')).toHaveLength(1);
});
