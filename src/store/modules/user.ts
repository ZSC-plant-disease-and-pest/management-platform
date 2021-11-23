import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { loginHttp, loginParams } from '@/api/login';
import { ElMessage } from 'element-plus';
import { removeToken, setToken } from '@/utils/cookie';

interface UserStore {
  id?: number;
  userName?: string;
  role?: string;
  name?: string;
  e_mail?: string;
  mobile?: string;
  token?: string;
  reftoken?: string;
}

class UserStoreModule implements Module<UserStore, any> {
  namespaced = true;

  state: loginParams = {
    state: 0,
    name: ''
  };

  mutations: MutationTree<loginParams> = {
    setUserId (state, id) {
      state.id = id;
    },
    setUsername (state, username) {
      state.username = username;
    },
    setName (state, name) {
      state.name = name;
    },
    setRole (state, role) {
      state.role = role;
    },
    setEMail (state, eMail) {
      state.e_mail = eMail;
    },
    setMobile (state, mobile) {
      state.mobile = mobile;
    },
    setToken (state, token) {
      state.token = token;
    },
    setState (state, userstate) {
      state.state = userstate;
    }
  };

  actions: ActionTree<loginParams, any> = {
    login ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        loginHttp.login(loginForm)
          .then((response: any) => {
            if (response.data === '登录成功') {
              commit('setUserId', response.user.id);
              commit('setUsername', response.user.username);
              commit('setName', response.user.name);
              commit('setRole', response.user.role);
              commit('setState', response.user.state);
              commit('setMobile', response.user.mobile);
              commit('setEMail', response.user.e_mail);
              commit('setToken', response.token);
              setToken(response.token);
              resolve('OK');
            } else {
              ElMessage.warning(response);
              reject(response);
            }
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        loginHttp.logout()
          .then((response: any) => {
            if (response === '注销成功') {
              commit('setUserId', 0);
              commit('setUsername', '');
              commit('setName', '');
              commit('setRole', '');
              commit('setEMail', '');
              commit('setMobile', '');
              commit('setToken', '');
              commit('setState', 0);
              removeToken();
              resolve('OK');
            } else {
              ElMessage.warning(response);
              reject(response);
            }
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    }
  };

  getters: GetterTree<loginParams, any> = {
    getUserId (state: loginParams) {
      return state.id;
    },
    getName (state: loginParams) {
      return state.name;
    },
    getUsername (state: loginParams) {
      return state.username;
    },
    getToken (state: loginParams) {
      return state.token;
    },
    getState (state: loginParams) {
      return state.state;
    }
  };
}

export default new UserStoreModule();
