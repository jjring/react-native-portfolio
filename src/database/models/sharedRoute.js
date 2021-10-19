import Realm from 'realm';

export default class SharedRoute extends Realm.Object {}
SharedRoute.schema = {
  name: 'SharedRoute',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    routeId: 'string',
    sharedDate: 'date',
    link: 'string',
  },
};
