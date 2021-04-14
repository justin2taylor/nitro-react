import React, { useEffect } from 'react';

import logo from '../../assets/nitro-react-logo.svg';

import { AppContext } from '../context/AppContext';

//@ts-ignore
import styled from 'styled-components';

import { FaReact } from 'react-icons/fa';

import './main.scss';

export const Main = () => {
  const { state, setState } = React.useContext(AppContext);

  const reactTest = () => {
    setState({ ...state, clicks: state.clicks + 1 });
  };

  return (
    <>
      <div className="app--container">
        {/* Custom Element Example */}
        <img className="app--logo" src={logo} alt="" />
        <code>{`while ( alive ) { haveCoffee ? keepCoding() : drinkCoffee(); }`}</code>
        <div className="app--grid">
          <div className="app--grid--a"></div>
          <div className="app--grid--b"></div>
          <div className="app--grid--c"></div>
          <div className="app--grid--d"></div>
          <div className="app--grid--e"></div>
          <div className="app--grid--f"></div>
        </div>
        <button className="special-button" onClick={reactTest}>
          <FaReact />
          {`React Test ${state.clicks}`}
        </button>
        <div>
          <code>
            site location:<span className={`app--value--true`}> {(state.isLocalSite && 'local') || 'remote'}</span>
          </code>
        </div>
      </div>
    </>
  );
};
