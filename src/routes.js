const { Router } = require('express');
const UserController = require('./controllers/User.controller');
const AddressController = require('./controllers/Address.controller');
const TechController = require('./controllers/Tech.controller');
const ReportController = require('./controllers/Report.controller');

const routes = Router();

routes.route('/').get((req, res) => {
  return res.json({ hello: 'world' });
});

routes.route('/users').get(UserController.index).post(UserController.store);

routes
  .route('/users/:user_id/addresses')
  .get(AddressController.index)
  .post(AddressController.store);

routes
  .route('/users/:user_id/techs')
  .get(TechController.index)
  .post(TechController.store)
  .delete(TechController.delete);

routes.route('/report').get(ReportController.show);

module.exports = routes;
