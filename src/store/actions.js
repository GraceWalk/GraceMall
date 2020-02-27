import { ADD_COUNT, ADD_DETAIL, MINUS_COUNT, REVERSE_CHECK } from './mutation-type'

export default {
  addToCart ({ state, commit }, payload) {
    let detail = state.details.find(detail => detail.iid === payload.iid)
    if (detail) {
      commit(ADD_COUNTER, detail)
    } else {
      commit(ADD_DETAIL, payload)
    }
  },
  changeCount({ state, commit }, payload) {
    let detail = state.details.find(detail => detail.iid === payload.iid)
    if (detail) {
      if (payload.do === 'add') {
        commit(ADD_COUNT, detail)
      } else {
        commit(MINUS_COUNT, detail)
      }
    }
  },
  reverseCheck({ state, commit }, payload) {
    let detail = state.details.find(detail => detail.iid === payload.iid)
    if (detail) {
      commit(REVERSE_CHECK, detail)
    }
  }
}