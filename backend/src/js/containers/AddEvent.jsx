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
  let $starttime = null;
  let $endtime = null;

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;

  const handleSubmit = e => {
    e.preventDefault();

    if ($starttime.value < $endtime.value) {
      addEvent($name.value, $description.value, $location.value, $date.value, $starttime.value, $endtime.value);
    }

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

          <textarea
            type='text'
            ref={$el => $description = $el}
            placeholder='beschrijving'
          ></textarea>

          <input
            type='text'
            ref={$el => $location = $el}
            placeholder='location'
          />

          <input
            type='date'
            ref={$el => $date = $el}
            min={today}
            placeholder='Datum'
          />

          <label htmlFor='startTime'>Starttijd</label>
          <input
            type='time'
            ref={$el => $starttime = $el}
            id='startTime'
          />

          <label htmlFor='endTime'>Eindtijd</label>
          <input
            type='time'
            ref={$el => $endtime = $el}
            id='endTime' />

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
