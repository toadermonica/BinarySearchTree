const express = require('express');
const bodyParser = require('body-parser');

const requestController = require('./controllers/RequestControllers');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const controller = requestController.RequestController();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.route('/insert')
//.get(controller.get)
.post(controller.post);

app.use('/', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = {
   app: app
}