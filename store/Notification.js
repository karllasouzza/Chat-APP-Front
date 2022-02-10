import Vue from 'vue'

// mutations
export const mutations = {
  toastError(state, text) {
    console.log(text)
    Vue.$toast.error(text, {
      position: 'top-center',
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false,
    })
  },
  toastSuccess(state, text) {
    Vue.$toast.success(text, {
      position: 'top-center',
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false,
    })
  },
  toastWarning(state, text) {
    Vue.$toast.warning(text, {
      position: 'top-center',
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false,
    })
  },
  toastInfo(state, text) {
    Vue.$toast.info(text, {
      position: 'top-center',
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false,
    })
  },
}

// actions
export const actions = {
  ToastError(context, text) {
    console.log(text)
    context.commit('toastError', text)
  },
  ToastSuccess(context, text) {
    context.commit('toastSuccess', text)
  },
  ToastWarning(context, text) {
    context.commit('toastWarning', text)
  },
  ToastInfo(context, text) {
    context.commit('toastInfo', text)
  },
}
