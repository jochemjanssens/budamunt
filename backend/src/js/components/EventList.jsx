/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

import Event from '../components/Event';


const EventList = ({events, store}) => {
  const {
    currentUser
  } = store;

  return (
      <ul className='tweets'>
        {
          events.map(
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
