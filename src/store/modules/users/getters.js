export default {
  users (state) {
    return state.users
  },
  errors (state) {
    return state.errors
  },
  success (state) {
    return state.success
  },
  hasUsers (state) {
    return state.users && state.users.length > 0
  }
}
