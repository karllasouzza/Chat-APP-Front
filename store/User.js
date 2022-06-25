export const state = () => ({
  user: {},
  userImg: '',
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },

  addUserImg(state, img) {
    state.userImg = img
  },

  clearUser(state) {
    state.user = {}
    state.userImg = ''
  },
}

export const actions = {
  SetUser(context, user) {
    context.commit('addUser', user)
  },
  SetUserImg(context, img) {
    context.commit('addUserImg', img)
  },
  SetUserChats(context, chats) {
    context.commit('addUserChats', chats)
  },
  SetNewUserChats(context, chat) {
    context.commit('addNewUserChat', chat)
  },
  DropUserChat(context, index) {
    context.commit('', index)
  },
}
