export const state = () => ({
  profiles: [],
})

export const mutations = {
  addFriendsProfiles(state, profiles) {
    state.profiles = [...profiles]
  },
  addNewFriendProfile(state, profile) {
    state.profiles.push(profile)
  },
  updateFriendProfile(state, profile, index) {
    state.profiles.splice(index, 1, profile)
  },
  DeleteFriendProfile(state, index) {
    state.profiles.splice(index, 1)
  },

  clearUser(state) {
    state.profiles = []
  },
}

export const actions = {
  SetFriendsProfiles(context, profiles) {
    context.commit('addFriendsProfiles', profiles)
  },
  SetNewFriendProfile(context, profile) {
    context.commit('addNewFriendProfile', profile)
  },
  AlterFriendProfile(context, item) {
    context.commit('updateFriendProfile', item)
  },
  DropFriendProfile(context, index) {
    context.commit('DeleteFriendProfile', index)
  },
}
