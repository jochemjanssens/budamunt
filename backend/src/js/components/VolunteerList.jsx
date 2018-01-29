/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

import Volunteer from '../components/Volunteer';


const VolunteerList = ({volunteers, store}) => {
  const {
    currentUser
  } = store;

  //Sorteer de events op een heel slechte manier
  // Maar het werkt 🔥
  const volunteersArray = [];
  volunteers.map(volunteer => {
    let added = false;
    volunteersArray.forEach((newVolunteer, key) => {
      if (volunteer.date < newVolunteer.date) {
        if (added === false) {
          volunteersArray.splice(key, 0, volunteer);
        }
        added = true;
      }
    });
    if (added === false) {
      volunteersArray.push(volunteer);
    }
  });

  return (
      <ul className='volunteers'>
        {
          volunteersArray.map(
            volunteer => (
              <Volunteer key={volunteer._id} status={(currentUser === volunteer.user) ? `own` : `other`} {...volunteer} />
            )
          )
        }
    </ul>
  );
};

VolunteerList.propTypes = {
  volunteers: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(
  observer(VolunteerList)
);
