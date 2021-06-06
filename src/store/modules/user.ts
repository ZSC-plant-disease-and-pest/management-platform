import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

interface UserStore {
  userId?: number;
  userName?: string;
  token?: string;
  reftoken?: string;
}

class UserStoreModule implements Module<UserStore, any> {
  namespaced = true;

  state: UserStore = {
    userId: undefined,
    userName: undefined,
    token: undefined
  };

  mutations: MutationTree<UserStore> = {
    setUserId (state, id) {
      state.userId = id;
    },
    setUserName (state, name) {
      state.userName = name;
    },
    setToken (state, token) {
      state.token = token;
    }
  };

  actions: ActionTree<UserStore, any> = {};

  getters: GetterTree<UserStore, any> = {
    getUserId (state: UserStore) {
      return state.userId;
    },
    getUserName (state: UserStore) {
      return state.userName;
    },
    getToken (state: UserStore) {
      return state.token;
    }
  };
}

export default new UserStoreModule();
