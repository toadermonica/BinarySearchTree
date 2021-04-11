const BinarySearchTree = require('../BinarySearchTree');
const ApiResponse = require('../models/ApiResponse');
const Utils = require('../utils/Utils');

const insertInTree = BinarySearchTree.InsertValueInTree;
const validation = Utils.TreeInsertValidation;
const buildResponse = ApiResponse.ApiResponse;

function RequestController() {

  function post(req, res) {
    const body = req.body;
    const isInvalidRequest = validation(body);
    if (isInvalidRequest)
    {
     const response = buildResponse(isInvalidRequest);
     return res.status(response.status).json(response);
    }
    const data = insertInTree(body.value, body.tree);
    return res.status(buildResponse(data).status).json(buildResponse(data));
  }
  
  return { post };
}

module.exports = {
  RequestController: RequestController
}