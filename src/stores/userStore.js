import { observable, action } from 'mobx';
import Realm from 'realm';
import UserSchema from './../schemas/userSchema';

class UserStore {

    @observable users = [];

    @action.bound
    fetchUsers(){

        this._addUser({ name: 'User', id: 1 });

    }

    _addUser(user){

        console.log('Adding user to Realm');
        console.log(user);

    }

}

// try {
//
//     Realm.open({
//         schema: [ UserSchema ],
//         deleteRealmIfMigrationNeeded: true
//     })
//     .then(realm => {
//
//         let users = realm.objects('User');
//
//         realm.write(() => {
//
//             console.log('Deleting the users...');
//             realm.delete(users);
//
//
//         });
//
//         ToastAndroid.show(`Num of users: ${Object.keys(users).length}`, ToastAndroid.SHORT);
//
//     })
//     .catch(err => {
//
//         console.log('[Error] error in realm');
//         console.log(err);
//
//         ToastAndroid.show('Error writng in Realm', ToastAndroid.SHORT);
//
//     });
//
// }
// catch(err){
//
//     console.log('[Error] Opening Realm');
//     console.log(err);
//     ToastAndroid.show('Error opening Realm', ToastAndroid.SHORT);
//
// }

export default new UserStore();
