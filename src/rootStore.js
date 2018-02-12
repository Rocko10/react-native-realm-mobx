import userStore from './stores/userStore';

class RootStore {

    constructor(){

        this.userStore = userStore;

    }

}

export default new RootStore();
