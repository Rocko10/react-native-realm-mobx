import { observable, action } from 'mobx';
import Realm from 'realm';
import UserSchema from './../schemas/userSchema';

class UserStore {

    @observable users = [];

    @action.bound
    fetchUsers(){

        const url = 'https://jsonplaceholder.typicode.com/users';

        fetch(url)
        .then(res => res.json())
        .then(users => {


            for(let i = 0; i < users.length; i++){

                this.users.push({
                    id: users[i]['id'],
                    name: users[i]['name'],
                    key: `${users[i]['id']}`
                });

                console.log('Added user to userStore');
                console.log(this.users[i]['key']);

                // this._addUser({
                //     id: users[i]['id'],
                //     name: users[i]['name']
                //     key: `${users[i]['id']}`
                // });

            }

        });

    }

    _addUser(user){

        // TODO: Add to realm
        console.log('Adding user to Realm');
        console.log(user.name);

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
