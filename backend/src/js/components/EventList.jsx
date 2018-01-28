/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

import Event from '../components/Event';


const EventList = ({events, store}) => {
  const {
    currentUser
  } = store;


  //Sorteer de events op een heel slechte manier
  // Maar het werkt 🔥
  const eventsArray = [];
  events.map(event => {
    let added = false;
    eventsArray.forEach((newEvent, key) => {
      if (event.date < newEvent.date) {
        if (added === false) {
          eventsArray.splice(key, 0, event);
        }
        added = true;
      }
    });
    if (added === false) {
      eventsArray.push(event);
    }
  });

  return (
      <ul className='tweets'>
        {
          eventsArray.map(
            event => (
              <Event key={event._id} status={(currentUser === event.user) ? `own` : `other`} {...event} />
            )
          )
        }
    </ul>
  );
};

EventList.propTypes = {
  events: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(
  observer(EventList)
);
