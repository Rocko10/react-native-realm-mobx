import Realm from 'realm';

const UserSchema = {

    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        key: 'string?',
        name: 'string',
        username: 'string?',
        email: 'string?'
    }

};

export default UserSchema;
