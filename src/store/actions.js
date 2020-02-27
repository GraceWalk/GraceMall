import { ADD_COUNTER, ADD_DETAIL } from './mutation-type'

export default {
  addToCart ({ state, commit }, payload) {
    let detail = state.details.find(detail => detail.iid === payload.iid)
    if (detail) {
      commit(ADD_COUNTER, detail)
    } else {
      commit(ADD_DETAIL, payload)
    }
  }
}