import Realm from 'realm';

const UserSchema = {

    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        username: 'string?',
        email: 'string?'
    }

};

export default UserSchema;
