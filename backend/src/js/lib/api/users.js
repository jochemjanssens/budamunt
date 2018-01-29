const url = `/api/users`;

export default {

  insert: (firstname, name, email, password, scope) => {

    const method = `POST`;
    const body = new FormData();
    body.append(`firstname`, firstname);
    body.append(`name`, name);
    body.append(`email`, email);
    body.append(`password`, password);
    body.append(`munten`, 0);
    body.append(`scope`, scope);

    return fetch(url, {method, body})
      .then(r => r.json())
      .catch(err => console.error(err));
  }


};
