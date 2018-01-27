/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';
import {string} from 'prop-types';

const Event = ({status, _id, date, name, location, description, store}) => {

  const {
    deleteEvent
  } = store;

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

  if (today > date) {
    //Events die voorbij zijn erwijderen
    //dit adhv. de client datum dus dit is niet zo veilig
    deleteEvent(_id);
  }

  const handleClick = () => {
    console.log(_id);
    deleteEvent(_id);
  };

  return (
    <li className={(status === `own`) ? `own event` : `else event`}>
      <h2>Naam: {name}</h2>
      <p>Waar: {location}</p>
      <p>Wanneer: {date}</p>
      <p>Wat: {description}</p>
      {(status === `own`) ? <p className='delete' onClick={handleClick}>Verwijder event</p> : ``}
    </li>
  );

};

Event.propTypes = {
  status: string.isRequired,
  _id: string.isRequired,
  date: string.isRequired,
  name: string.isRequired,
  location: string.isRequired,
  description: string.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(
  observer(Event)
);
