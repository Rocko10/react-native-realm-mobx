import { observable, action } from 'mobx';

class UserStore {

    @observable users = [];

}

export default new UserStore();
