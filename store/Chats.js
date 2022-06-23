export const state = () => ({
  userChats: [],
  friendsProfiles: [],
  chatsMessages: [],
})

export const mutations = {
  addUserChats(state, chats) {
    state.userChats = [...chats]
  },
  addNewUserChat(state, chat) {
    state.userChats.push(chat)
  },
  DeleteUserChat(state, index) {
    state.userChats.splice(index, 1)
  },

  addChatMessages(state, messages) {
    state.chatsMessages = [...messages]
  },
  addNewChatMessage(state, message) {
    state.chatsMessages.push(message)
  },
  updateChatMessage(state, item) {
    state.chatsMessages.splice(item.index, 1, item.message)
  },
  DeleteChatMessage(state, index) {
    state.chatsMessages.splice(index, 1)
  },

  clearUser(state) {
    state.userChats = []
  },
}

export const actions = {
  SetUserChats(context, chats) {
    context.commit('addUserChats', chats)
  },
  SetNewUserChats(context, chat) {
    context.commit('addNewUserChat', chat)
  },
  DropUserChat(context, index) {
    context.commit('', index)
  },

  SetChatMessage(context, messages) {
    context.commit('addChatMessages', messages)
  },
  SetNewChatMessage(context, message) {
    context.commit('addNewChatMessage', message)
  },
  AlterChatMessage(context, item) {
    context.commit('updateChatMessage', item)
  },
  DropChatMessage(context, index) {
    context.commit('DeleteChatMessage', index)
  },

  SetFriendsProfiles(context, messages) {
    context.commit('addFriendsProfiles', messages)
  },
  SetNewFriendProfile(context, message) {
    context.commit('addFriendsProfiles', message)
  },
  AlterFriendProfile(context, item) {
    context.commit('updateChatMessage', item)
  },
  DropFriendProfile(context, index) {
    context.commit('DeleteChatMessage', index)
  },
}
