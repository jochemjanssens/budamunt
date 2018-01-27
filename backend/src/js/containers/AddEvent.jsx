import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

import {Redirect} from 'react-router';

const AddEvent = ({store}) => {

  const {
    addEvent,
    eventAdded
  } = store;

  let $name = null;
  let $description = null;
  let $location = null;
  let $date = null;

  const handleSubmit = e => {
    e.preventDefault();
    addEvent($name.value, $description.value, $location.value, $date.value);
  };
  if (eventAdded !== true) {
    return (
      <div className='addEvent'>
        <h1>Evenement toevoegen</h1>
        <form className='addEvent' onSubmit={handleSubmit}>
          <input
            type='text'
            ref={$el => $name = $el}
            placeholder='Naam'
          />

          <input
            type='text'
            ref={$el => $description = $el}
            placeholder='beschrijving'
          />

          <input
            type='text'
            ref={$el => $location = $el}
            placeholder='location'
          />

          <input
            type='date'
            ref={$el => $date = $el}
            placeholder='Datum'
          />

          <input
            type='submit'
            value='Bevestig'
            className='register-submit'
          />
        </form>
      </div>
    );
  } else {
    return (
      <Redirect to='/Events' />
    );
  }

};

AddEvent.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(AddEvent)
);
