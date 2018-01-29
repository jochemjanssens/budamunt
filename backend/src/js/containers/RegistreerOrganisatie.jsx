import React from 'react';

import {Link} from 'react-router-dom';

import {observer, inject, PropTypes} from 'mobx-react';

import {Redirect} from 'react-router';

const RegistreerOrganisatie = ({store}) => {

  const {
    registerOrganisation,
    registered
  } = store;


  let $organisatie = null;
  let $type = null;
  let $street = null;
  let $city = null;

  let $name = null;
  let $firstname = null;
  let $email = null;
  let $password = null;

  const handleSubmit = e => {

    e.preventDefault();

    registerOrganisation(
      $firstname.value,
      $name.value,
      $email.value,
      $password.value,
      $organisatie.value,
      $type.value,
      $street.value,
      $city.value
    );
  };

  if (registered) {
    return (
     <Redirect to='/' />
    );
  }

  return (
    <div className='register'>
      <h1>Registreer Organisatie</h1>
      <form className='login' onSubmit={handleSubmit}>

        <input
          type='text'
          ref={$el => $organisatie = $el}
          placeholder='naam organisatie'
        />

        <select ref={$el => $type = $el}>
          <option value='vrijwilligers'>Vrijwilligersorganisate</option>
          <option value='ngo'>NGO</option>
        </select>

        <input
          type='text'
          ref={$el => $street = $el}
          placeholder='Vul de straat en nummer in'
        />

        <input
          type='text'
          ref={$el => $city = $el}
          value='8500 Kortrijk'
        />

        <input
          type='text'
          ref={$el => $firstname = $el}
          placeholder='voornaam'
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


      <Link to='/'>Terug</Link>
    </div>
  );
};

RegistreerOrganisatie.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(RegistreerOrganisatie)
);
