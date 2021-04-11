const should = require('should');
const request = require('supertest');
const sinon = require('sinon');

const requestController = require('../controllers/RequestControllers').RequestController;
const application = require('../app').app;
const testAgent = request.agent(application);


describe('Request Controller Tests:', () => {
  describe('Post', () => {
    it('should create a tree value 5, left and right null ', () => {
      //Arrange
      const req = {body: {value: 5,tree: null}};
      const res = {status: sinon.spy(),json: sinon.spy()}
      //Act
      const controller = requestController();
      controller.post(req, res)
      //Assert
      res.status.calledWith(200).should.equal(true);
    });
  });
});

describe('API test:',() => {
  describe('Post', ()=>{
    it('Successfully insert a new tree with only one node', () => 
    {
      const reqNewTree = {value: 8, tree: null};
      const reqLeftNode = {value: 7, tree: 8};
      const reqRightNode = {value: 9, tree: 8};
      testAgent.post('/insert')
        .send(reqNewTree)
        .expect(200)
        .end((err, result) => {
          result.body.status.should.not.equal(402);
          result.body.status.should.equal(200);
          result.body.should.have.property('data');
          result.body.data.should.have.property('value').equal(reqNewTree.value);
          result.body.data.should.have.property('left').equal(null);
          result.body.data.should.have.property('right').equal(null);
        });
    });
    it('Successfully insert a left node existing tree', () => 
    {
      const reqNewTree = {value: 8, tree: null};
      const reqLeftNode = {value: 7, tree: 8};
      testAgent.post('/insert')
      .send(reqNewTree)
      .expect(200)
      .send(reqLeftNode)
      .expect(200)
      .end((err, result) => {
        result.body.status.should.not.equal(402);
        result.body.status.should.equal(200);
        result.body.should.have.property('data');
        result.body.data.should.have.property('value').equal(reqNewTree.value);
        result.body.data.should.have.property('value').equal(reqLeftNode.tree);
        result.body.data.left.should.have.property('value').equal(reqLeftNode.value);
        result.body.data.left.should.have.property('left').equal(null);
        result.body.data.left.should.have.property('right').equal(null);
      });
    });
    it('Successfully insert a right node existing tree', () => 
    {
      const reqNewTree = {value: 8, tree: null};
      const reqLeftNode = {value: 7, tree: 8};
      const reqRightNode = {value: 9, tree: 8};
      testAgent.post('/insert')
      .send(reqNewTree)
      .expect(200)
      .send(reqLeftNode)
      .expect(200)
      .send(reqRightNode)
      .expect(200)
      .end((err, result) => {
        result.body.status.should.not.equal(402);
        result.body.status.should.equal(200);
        result.body.should.have.property('data');
        result.body.data.should.have.property('value').equal(reqNewTree.value);
        result.body.data.should.have.property('value').equal(reqLeftNode.tree);
        result.body.data.should.have.property('value').equal(reqRightNode.tree);
        result.body.data.left.should.have.property('value').equal(reqLeftNode.value);
        result.body.data.left.should.have.property('left').equal(null);
        result.body.data.left.should.have.property('right').equal(null);
        result.body.data.right.should.have.property('value').equal(reqRightNode.value);
        result.body.data.right.should.have.property('left').equal(null);
        result.body.data.right.should.have.property('right').equal(null);
      });
    });
  });
});