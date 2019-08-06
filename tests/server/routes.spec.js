import sinon from 'sinon';

import routes from '../../src/server/routes';
import connect from '../../src/server/connect-db';

let stubDB = null;

describe('test routes', () => {
  beforeEach(() => {
    stubDB = sinon.stub(connect, 'connectDB').returns(
      Promise.resolve({
        collection: sinon.stub().returns({ insertOne: sinon.stub() })
      })
    );
  });

  afterEach(() => {
    stubDB.restore();
  });

  it('adds New Task', async () => {
    await routes.addNewTask({}, stubDB);
    sinon.assert.called(stubDB);
  });

  it('updates task', async () => {
    await routes.updateTask({});
    sinon.assert.called(stubDB);
  });

  it('calls taskNew', async () => {
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
