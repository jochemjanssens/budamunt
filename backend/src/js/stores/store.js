import {observable} from 'mobx';
import authAPI from '../lib/api/auth';
import userAPI from '../lib/api/users';
import eventsAPI from '../lib/api/events';

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
  registered = ``

  @observable
  events = `empty`;

  @observable
  currentUser = ``;

  loadEvents = () => {
    this.eventAdded = false;
    this.getEvents();
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
      });
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

  register = (firstname, name, email, password) => {
    userAPI.insert(firstname, name, email, password)
      .then(response => {
        if (response.statusCode !== 400) {
          this.registered = true;
        } else {
          this.registered = false;
        }
      });
  }

  addEvent = (name, description, location, date, starttime, endtime) => {
    eventsAPI.insert(this.currentUser, name, description, location, date, starttime, endtime, this.token)
      .then(d => {
        console.log(d);
        this.eventAdded = true;
      });
  }

  deleteEvent = id => {
    eventsAPI.remove(id, this.token)
      .then(d => {
        console.log(d);
        this.loadEvents();
      });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
