const express = require('express');

function routes(Client) {
  const clientRouter = express.Router();

  // Routes on clientRouter
  clientRouter.route('/clients')
    .post((req, res) => {
      const client = new Client(req.body);

      client.save();

      return res.status(201).json(client);
    })
    .get((req, res) => {
      Client.find((err, clients) => {
        if (err) {
          return res.send(err);
        }
        return res.json(clients);
      });
    });

  // Middleware
  clientRouter.use('/client/:clientId', (req, res, next) => {
    Client.findById(req.params.clientId, (err, client) => {
      if (err) {
        return res.send(err);
      }

      if (client) {
        req.client = client;
        return next();
      }

      return res.sendStatus(404);
    });
  });

  clientRouter.route('/client/:clientId')
    .get((req, res) => res.json(req.client))
    .put((req, res) => {
      const { client } = req;
      client.name = req.body.name;
      client.email = req.body.email;
      client.number = req.body.number;
      client.address = req.body.address;

      client.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(client);
      });
    })
    .patch((req, res) => {
      const { client } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        client[key] = value;
      });

      client.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(client);
      });
    })
    .delete((req, res) => {
      req.client.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return clientRouter;
}

module.exports = routes;
