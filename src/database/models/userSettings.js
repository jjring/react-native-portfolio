import Realm from 'realm';

export default class UserSettings extends Realm.Object {}
UserSettings.schema = {
  name: 'UserSettings',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    units: 'int',
    accuracy: 'int',
    weatherPins: 'bool',
    showAltitude: 'bool',
    showSpeed: 'bool',
    stopPins: 'bool',
    stopPinDuration: 'int',
    intervalPins: 'bool',
    intervalPinDistance: 'int',
  },
};
