import React from 'react';
import './spiner.styles.scss';

function Spinner(props) {
  const widthStyle = {
     width: props.size + 'px',
     height: props.size + 'px',
    background: '-moz-linear-gradient(left, '+props.color + ' 10%, rgba(255, 255, 255, 0) 42%)',
    background: '-webkit-linear-gradient(left, '+props.color + ' 10%, rgba(255, 255, 255, 0) 42%)',
    background: '-o-linear-gradient(left, '+props.color + ', rgba(255, 255, 255, 0) 42%)',
    background: '-ms-linear-gradient(left, '+props.color + ', rgba(255, 255, 255, 0) 42%)',
    background: 'linear-gradient(to right, '+props.color + ', rgba(255, 255, 255, 0) 42%)'
  }
  return <div className={'loader '+props.background} style = { widthStyle } >Loading</div>;
}
export default Spinner;