export const state = () => ({
  noShiftEnter: false,
  noProfileImage: false,
})

export const mutations = {
  onProfileImage(state) {
    state.noProfileImage = true
  },
  onShiftEnter(state) {
    state.noShiftEnter = true
  },
}
