/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';
import {string} from 'prop-types';

const Event = ({status, _id, date, name, location, description, store}) => {

  const {
    deleteEvent
  } = store;

  const handleClick = () => {
    console.log(_id);
    deleteEvent(_id);
  };

  return (
    <li className={(status === `own`) ? `own` : `else`}>
      <h2>Naam: {name}</h2>
      <p>Waar: {location}</p>
      <p>Wanneer: {date}</p>
      <p>Wat: {description}</p>
      {(status === `own`) ? <p onClick={handleClick}>Verwijder event</p> : ``}
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
