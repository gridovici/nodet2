import sinon from 'sinon';
import Routes from '../src/server/routes';
// import chai from 'chai';
// import * as routes from '../src/server/routes';

// const connect = require('../src/server/connect-db');
// import { connectDB } from '../src/server/connect-db';
// import * as connect from '../src/server/connect-db';
import connect from '../src/server/connect-db';

let stub = null;

describe('test routes', () => {
  beforeEach(() => {
    stub = sinon.stub(connect, 'connectDB');
    stub.returns(
      Promise.resolve({
        collection: sinon.stub().returns({ insertOne: sinon.stub() })
      })
    );
  });

  afterEach(() => {
    stub.restore();
  });

  // it('checks equality', () => {
  //   expect(true).to.be.true;
  // });

  it('calls taskNew', async () => {
    console.log('routes', Routes);
    console.log('connect', connect);
    console.log('connect.connectDB', connect.connectDB);
    await Routes.addNewTask({});
    sinon.assert.called(connect.connectDB);
  });

  it('calls addNewTask', async () => {
    const stubAddNewTask = sinon.stub(Routes, 'addNewTask').returns(Promise.resolve({ }));
    const send = sinon.stub();
    const req = { body: {} };
    const res = { status: sinon.stub().returns({ send }) };
    await Routes.taskNew(req, res);
    sinon.assert.calledOnce(stubAddNewTask);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(send);
    stubAddNewTask.restore();
  });
});
