import Realm, {ObjectSchema} from 'realm';

export class User extends Realm.Object<User> {
  token?: string;
  rememberMe?: boolean;
  fullName?: string;
  role?: string;
  balance?: number;
  haveWallet?: boolean;
  static schema: ObjectSchema = {
    name: 'User',
    properties: {
      token: 'string',
      rememberMe: 'bool',
      role: 'string',
      fullName: {type: 'string', indexed: 'full-text'},
      balance: 'int?',
      haveWallet: 'bool?',
    },
  };
}
