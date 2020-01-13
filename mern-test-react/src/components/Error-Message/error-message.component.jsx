import React from 'react';
import './error-message.styles.scss';

function ErrorMessage(props) {
  return <div className='error_message'>
  <h5>{props.message}</h5>

</div>
}
export default ErrorMessage;