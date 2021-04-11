const express = require('express');
const bodyParser = require('body-parser');

const requestController = require('./controllers/RequestControllers').RequestController();
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);

router.route('/insert').post(requestController.post);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = {
   app: app
}