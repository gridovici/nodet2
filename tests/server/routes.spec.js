import sinon from 'sinon';

import routes from '../../src/server/routes';
import connect from '../../src/server/connect-db';

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

//   it('calls taskNew', async () => {
//     console.log('routes', routes);
//     console.log('connect', connect);
//     console.log('connect.connectDB', connect.connectDB);
//     await routes.addNewTask({});
//     sinon.assert.called(connect.connectDB);
//   });

  it('calls addNewTask', async () => {
    const stubAddNewTask = sinon.stub(routes, 'addNewTask').returns(Promise.resolve({ }));
    const send = sinon.stub();
    const req = { body: {} };
    const res = { status: sinon.stub().returns({ send }) };
    await routes.taskNew(req, res);
    sinon.assert.calledOnce(stubAddNewTask);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(send);
    stubAddNewTask.restore();
  });
});
