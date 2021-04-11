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
      const req = { body: { value: 5, tree: null } };
      const res = { status: sinon.spy(), json: sinon.spy() }
      //Act
      const controller = requestController();
      controller.post(req, res)
      //Assert
      res.status.calledWith(200).should.equal(true);
    });
  });
});

describe('API Valid Response Tests:', () => {
  describe('Post', () => {
    it('Successfully insert a new tree with only one node', () => {
      const reqNewTree = { value: 8, tree: null };
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
    it('Successfully insert a left node existing tree', () => {
      const reqNewTree = { value: 8, tree: null };
      const reqLeftNode = { value: 7, tree: 8 };
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
    it('Successfully insert a right node existing tree', (done) => {
      const reqNewTree = { value: 8, tree: null };
      const reqLeftNode = { value: 7, tree: 8 };
      const reqRightNode = { value: 9, tree: 8 };
      testAgent.post('/insert')
        .send(reqNewTree)
        .expect(200)
        .send(reqLeftNode)
        .expect(200)
        .send(reqRightNode)
        .expect({
          status: 200,
          data: {
            value: 8,
            left: {
              value: 7,
              left: null,
              right: null
            },
            right: {
              value: 9,
              left: null,
              right: null
            }
          }
        })
        .end(done);
    });
  });
});

describe('API Error Response Tests:', () => {
  describe('Post', () => {
    it('Invalid null value & null tree returns error message and status 402', (done) => {
      const invalidRequest = { value: null, tree: null };
      testAgent.post('/insert')
        .send(invalidRequest)
        .expect({ status: 402, error: "This is a bad request. Data provided is invalid!" })
        .end(done);
    });
    it('Invalid null value returns error message and status 402', (done) => {
      const invalidRequest = { value: null, tree: 8 };
      testAgent.post('/insert')
        .send(invalidRequest)
        .expect({ status: 402, error: "This is a bad request. Data provided is invalid!" })
        .end(done);
    });
    it('Invalid null value returns error message and status 402', (done) => {
      const insertInvalidNode = { value: 17, tree: 88 };
      testAgent.post('/insert')
        .send(insertInvalidNode)
        .expect({
          "status": 402,
          "error": `Tree with root ${insertInvalidNode.tree} does not exist!`
        })
        .end(done);
    });
  });
});