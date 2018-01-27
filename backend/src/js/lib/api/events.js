const url = `/api/events`;

export default {

  insert: (name, description, location, date, token = ``) => {

    const method = `POST`;
    const body = new FormData();

    body.append(`name`, name);
    body.append(`description`, description);
    body.append(`location`, location);
    body.append(`date`, date);

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    return fetch(url, {method, body, headers})
      .then(r => r.json())
      .catch(err => console.error(err));
  },

  select: (token = ``) => {

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    return fetch(`${url}?isActive=true`, {headers})
      .then(r => r.json())
      .catch(err => console.error(err));

  },

  remove: (id, token = ``) => {

    const method = `DELETE`;

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    return fetch(`${url}/${id}`, {method, headers})
      .catch(err => console.error(err));

  }


};
