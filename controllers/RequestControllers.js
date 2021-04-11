const BinarySearchTree = require('../BinarySearchTree');
const ApiResponse = require('../models/ApiResponse');
const Utils = require('../utils/Utils');

const insertInTree = BinarySearchTree.InsertValueInTree;
const validation = Utils.TreeInsertValidation;
const buildResponse = ApiResponse.ApiResponse;

function RequestController() {
  
  //post request function
  function post(req, res) {
    const body = req.body;
    const isInvalidRequest = validation(body);
    if (isInvalidRequest) {
      return res.json(buildResponse(isInvalidRequest));
    }
    const data = insertInTree(body.value, body.tree);
    const reponse = buildResponse(data);
    res.status(reponse.status);
    return res.json(reponse);
  }
  
  return { post };
}

module.exports = {
  RequestController: RequestController
}