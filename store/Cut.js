export const state = () => ({
  image: null,
  cut: false,
})

// mutations
export const mutations = {
  // Items
  addImage(state, img) {
    state.image = img
    state.cut = true
  },

  clearImage(state, User) {
    state.image = null
    state.cut = false
  },

  onCut(state) {
    state.cut = true
  },

  offCut(state) {
    state.cut = false
  },
}

// actions
export const actions = {
  SetImage(context, img) {
    context.commit('addImage', img)
  },
}
