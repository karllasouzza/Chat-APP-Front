export const state = () => ({
  text: '',
  view: false,
})

// mutations
export const mutations = {
  OpenNotify(state, text) {
    state.text = text
    state.view = true
  },
  CloseNotify(state) {
    state.text = ''
    state.view = false
  },
}

// actions
export const actions = {
  SetNotify(context, text) {
    context.commit('OpenNotify', text)
  },
}
