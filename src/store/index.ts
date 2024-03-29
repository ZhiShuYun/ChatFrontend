import { createStore, ActionContext } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { userOperator, IUser } from '@/operators';
import { removeCookies } from '@/utils/cookie';
import { IConversation } from '@/operators/conversation/models';
import { DEFAULT_API, ENDPOINT } from '@/constants';

export interface ISetting {
  stream?: boolean;
  endpoint?: string;
}

export interface IState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: IUser | undefined;
  activeApiId: string | undefined;
  conversations: IConversation[];
  setting: ISetting;
}

const store = createStore({
  state(): IState {
    return {
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
      activeApiId: DEFAULT_API.id,
      conversations: [],
      setting: {
        endpoint: ENDPOINT,
        stream: false
      }
    };
  },
  mutations: {
    setAccessToken(state: IState, payload: string): void {
      state.accessToken = payload;
    },
    setRefreshToken(state: IState, payload: string): void {
      state.refreshToken = payload;
    },
    setUser(state: IState, payload: IUser): void {
      state.user = payload;
    },
    setSetting(state: IState, payload: ISetting): void {
      state.setting = {
        ...state.setting,
        ...payload
      };
    },
    setConversations(state: IState, payload: IConversation[]): void {
      state.conversations = payload;
    },
    setActiveApiId(state: IState, payload: string): void {
      state.activeApiId = payload;
    }
  },
  actions: {
    resetAuth({ commit }) {
      commit('setRefreshToken', undefined);
      commit('setAccessToken', undefined);
      commit('setUser', undefined);
      removeCookies();
    },
    setRefreshToken({ commit }: ActionContext<IState, IState>, payload: string) {
      commit('setRefreshToken', payload);
    },
    setAccessToken({ commit }: ActionContext<IState, IState>, payload: string) {
      commit('setAccessToken', payload);
    },
    setUser({ commit }: ActionContext<IState, IState>, payload: IUser) {
      commit('setUser', payload);
    },
    setSetting({ commit }: ActionContext<IState, IState>, payload: ISetting) {
      commit('setSetting', payload);
    },
    setActiveApiId({ commit }: ActionContext<IState, IState>, payload: string) {
      commit('setActiveApiId', payload);
    },
    setConversations({ commit }: ActionContext<IState, IState>, payload: IConversation[]) {
      commit('setConversations', payload);
    },
    getMe({ commit }: ActionContext<IState, IState>) {
      userOperator
        .getMe()
        .then(({ data: data }) => {
          commit('setUser', data);
        })
        .catch(() => {
          console.error('failed to get user info');
        });
    }
  },
  getters: {
    authenticated(state): boolean {
      return !!state.accessToken;
    },
    accessToken(state): string | undefined {
      return state.accessToken;
    },
    activeApiId(state): string | undefined {
      return state.activeApiId;
    },
    refreshToken(state): string | undefined {
      return state.refreshToken;
    },
    user(state): IUser | undefined {
      return state.user;
    },
    setting(state): ISetting | undefined {
      return state.setting;
    },
    conversations(state): IConversation[] {
      return state.conversations || [];
    }
  },
  plugins: [createPersistedState()]
});

export default store;
