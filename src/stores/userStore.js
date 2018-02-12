import { observable, action } from 'mobx';
import Realm from 'realm';
import UserSchema from './../schemas/userSchema';

class UserStore {

    @observable users = [];
    @observable user = {};

    @action.bound
    fetchUsers(){

        const url = 'https://jsonplaceholder.typicode.com/users';

        fetch(url)
        .then(res => res.json())
        .then(users => {

            // Add them to mobx
            for(let i = 0; i < users.length; i++){

                this.users.push({
                    id: users[i]['id'],
                    name: users[i]['name'],
                    key: `${users[i]['id']}`
                });

            }

            Realm.open({
                schema: [ UserSchema ],
                deleteRealmIfMigrationNeeded: true
            })
            .then(realm => {

                // Add them to realm
                for(let i = 0; i < users.length; i++){

                    this._addUser(realm, {
                        id: users[i]['id'],
                        name: users[i]['name'],
                        key: `${users[i]['id']}`,
                        username: users[i]['username'],
                        email: users[i]['email'],
                        phone: users[i]['phone']
                    })
                }

            })
            .catch(err => {

                console.log('[Error] Realm in write');
                console.log(err);

            });

        });

    }

    _addUser(realm, user){

        // Add user to realm
        let realmUsers = realm.objects('User');
        let realmUser = realmUsers.filtered(`id = ${user.id}`);

        if(Object.keys(realmUser).length === 0 ){

            realm.write(() => {

                realm.create('User', user);

            });

        }
    }

    @action.bound
    getUsers(){

        return new Promise((resolve, reject) => {

            Realm.open({
                schema: [ UserSchema ],
                deleteRealmIfMigrationNeeded: true
            })
            .then(realm => {

                let users = realm.objects('User');

                if(Object.keys(users).length > 0){

                    resolve(true)

                    for(let key in users){

                        if(users.hasOwnProperty(key)){

                            this.users.push({
                                id: users[key]['id'],
                                key: `${users[key]['id']}`,
                                name: users[key]['name'],
                            })

                        }

                    }

                }
                else{

                    resolve(false);

                }


            })
            .catch(err => {

                reject(err);

            });

        });

    }

    @action.bound
    userDetail(userID){

        return new Promise((resolve, reject) => {

            Realm.open({
                schema: [ UserSchema ],
                deleteRealmIfMigrationNeeded: true
            })
            .then(realm => {

                let users = realm.objects('User');
                let user = users.filtered(`id = ${userID}`);

                if(Object.keys(user).length > 0){

                    // The filtered object in realm are given back by { '0' : {...} }
                    this.user = user[0];
                    return resolve(user)

                }

                return reject('No user founded');

            })
            .catch(err => { reject(err) });

        });


    }

}

export default new UserStore();
