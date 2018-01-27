/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

const Login = ({store}) => {

  const {
    login,
    failed
  } = store;

  let $email = null;
  let $password = null;

  const handleSubmit = e => {

    e.preventDefault();

    login($email.value, $password.value);

  };

  if (failed) {
    return (

      <form className='login' onSubmit={handleSubmit}>

        <input
          type='email'
          ref={$el => $email = $el}
          placeholder='email'
        />

        <input
          type='password'
          ref={$el => $password = $el}
          placeholder='password'
        />

        <input
          type='submit'
          value='submit'
          className='login-submit'
        />

        <p>FOUT</p>

      </form>

    );
  } else {
    return (

      <form className='login' onSubmit={handleSubmit}>

        <input
          type='email'
          ref={$el => $email = $el}
          placeholder='email'
        />

        <input
          type='password'
          ref={$el => $password = $el}
          placeholder='password'
        />

        <input
          type='submit'
          value='submit'
          className='login-submit'
        />

      </form>

    );
  }



};

Login.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(Login)
);
