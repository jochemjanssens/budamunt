import {observable} from 'mobx';
import authAPI from '../lib/api/auth';
import userAPI from '../lib/api/users';
import eventsAPI from '../lib/api/events';
import volunteersAPI from '../lib/api/volunteers';
import currentUserAPI from '../lib/api/me';
import organisationsAPI from '../lib/api/organisations';
import storeAPI from '../lib/api/store';

class Store {

  @observable
  name = `Budamunt`

  @observable
  token = ``

  @observable
  failed = ``

  @observable
  eventAdded = ``

  @observable
  volunteerAdded = ``

  @observable
  registered = ``

  @observable
  events = ``;

  @observable
  volunteers = ``;

  @observable
  currentUser = ``;

  @observable
  userType = ``;

  @observable
  userInformation = ``;

  @observable
  organisationInformation = ``;

  @observable
  storeInformation = ``;

  loadEvents = () => {
    this.eventAdded = false;
    this.getEvents();
  }

  loadVolunteers = () => {
    this.volunteerAdded = false;
    this.getVolunteers();
  }

  timeline = () => {
    console.log(`on home`);
  }

  constructor() {
  }

  login = (username, password) => {
    authAPI.auth(username, password)
      .then(({token}) => {
        if (token === undefined) {
          this.failed = true;
        } else {
          this.failed = false;
        }
        this.currentUser = username;
        this.token = token;
        this.getEvents();
        this.getVolunteers();
        currentUserAPI.select(this.token)
          .then(response => {
            this.checkUser(response);
          });
      });
  }

  checkUser = user => {
    this.userInformation = user;
    if (user.scope === `ORGANISATIE`) {
      this.userType = `ORGANISATIE`;
      organisationsAPI.select(this.token)
        .then(({organisations}) => {
          organisations.forEach(organisation => {
            if (user._id === organisation.userId) {
              this.organisationInformation = organisation;
            }
          });
        });
    } else if (user.scope === `STORE`) {
      this.userType = `STORE`;
      storeAPI.select(this.token)
        .then(({stores}) => {
          stores.forEach(store => {
            console.log(store);
            if (user._id === store.userId) {
              this.storeInformation = store;
            }
          });
        });
    } else {
      this.userType = `USER`;
    }
  }

  getEvents = () => {
    eventsAPI.select(this.token)
      .then(({events}) => {
        if (events) {
          if (events.length === 0) {
            this.events = `empty`;
          } else if (events.length !== this.events.length) {
            this.events = events;
          }
        }
      });
  }

  getVolunteers = () => {
    volunteersAPI.select(this.token)
      .then(({volunteers}) => {
        if (volunteers) {
          if (volunteers.length === 0) {
            this.volunteers = `empty`;
          } else if (volunteers.length !== this.volunteers.length) {
            this.volunteers = volunteers;
          }
        }
      });
  }

  register = (firstname, name, email, password) => {
    userAPI.insert(firstname, name, email, password, `USER`)
      .then(response => {
        if (response.statusCode !== 400) {
          this.registered = true;
        } else {
          this.registered = false;
        }
      });
  }

  registerOrganisation = (firstname, name, email, password, organisatie, type, street, city) => {
    userAPI.insert(firstname, name, email, password, `ORGANISATIE`)
      .then(user => {
        organisationsAPI.insert(user._id, organisatie, type, street, city)
          .then(response => {
            if (response.statusCode !== 400) {
              this.registered = true;
            } else {
              this.registered = false;
            }
          });
      });
  }

  registerStore = (firstname, name, email, password, organisatie, type, street, city) => {
    userAPI.insert(firstname, name, email, password, `STORE`)
      .then(user => {
        console.log(user);
        storeAPI.insert(user._id, organisatie, type, street, city)
          .then(response => {
            if (response.statusCode !== 400) {
              this.registered = true;
            } else {
              this.registered = false;
            }
          });
      });
  }

  addEvent = (name, description, location, date, starttime, endtime) => {
    eventsAPI.insert(this.currentUser, name, description, location, date, starttime, endtime, this.token)
      .then(d => {
        console.log(d);
        this.eventAdded = true;
      });
  }

  addVolunteer = (name, description, location, date, starttime, endtime, munten) => {
    volunteersAPI.insert(this.currentUser, name, description, location, date, starttime, endtime, munten, this.token)
      .then(d => {
        console.log(d);
        this.volunteerAdded = true;
      });
  }

  deleteEvent = id => {
    eventsAPI.remove(id, this.token)
      .then(d => {
        console.log(d);
        this.loadEvents();
      });
  }

  deleteVolunteer = id => {
    volunteersAPI.remove(id, this.token)
      .then(d => {
        console.log(d);
        this.loadVolunteers();
      });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
