import sinon from 'sinon';
import chai from 'chai';
import { MongoClient } from 'mongodb';

import connect from '../../src/server/connect-db';

const dbResult = { db: true };
const stubDB = sinon.stub().returns(dbResult);

describe('test routes', () => {
  beforeEach(() => {
    sinon.stub(MongoClient, 'connect').returns(Promise.resolve({ db: stubDB }));
  });

  it('connects DB', async () => {
    const result = await connect.connectDB();
    sinon.assert.called(MongoClient.connect);
    sinon.assert.called(stubDB);
    sinon.assert.match(result, dbResult);
    chai.expect(result).to.eql(dbResult);
  });
});
