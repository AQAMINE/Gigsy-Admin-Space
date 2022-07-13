export default {
  async loadUsers (context) {
    const users = []
    await window.axios.get(this.$app_url + '/api/v1/admins/list').then(response => {
      const respanseData = response.data.data
      for (const key in respanseData) {
        const convertedData = { ...respanseData[key].user }
        const user = {
          id: convertedData.id,
          fullname: convertedData.fullname,
          email: convertedData.email,
          created_at: convertedData.created_at
        }
        users.push(user)
      }
      context.commit('setUsers', users)
      context.commit('setFetchTimesTamp')
    }).catch(error => context.commit('setErrors', error.message))
  },
  async deleteUser (context, payload) {
    const userId = payload.id
    await window.axios.delete(this.$app_url + `/api/v1/admins/${userId}`).then(response => {
      context.commit('setSuccess', response.data.message)
      context.dispatch('loadUsers', { forceRefresh: true })
    }).catch(error => context.commit('setErrors', error.message))
  }
}
