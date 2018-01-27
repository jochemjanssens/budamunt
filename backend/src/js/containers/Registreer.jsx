import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

import {Redirect} from 'react-router';

const Registreer = ({store}) => {

  const {
    register,
    registered
  } = store;

  let $name = null;
  let $firstname = null;
  let $email = null;
  let $password = null;

  const handleSubmit = e => {

    e.preventDefault();

    register($firstname.value, $name.value, $email.value, $password.value);
  };

  if (registered) {
    return (
     <Redirect to='/' />
    );
  }

  return (
    <div className='register'>
      <h1>Registreer</h1>
      <form className='login' onSubmit={handleSubmit}>

        <input
          type='text'
          ref={$el => $firstname = $el}
          placeholder='firstname'
        />

        <input
          type='text'
          ref={$el => $name = $el}
          placeholder='name'
        />

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

        <p>{registered.toString()}</p>

        <input
          type='submit'
          value='submit'
          className='register-submit'
        />
      </form>
    </div>
  );
};

Registreer.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(Registreer)
);
