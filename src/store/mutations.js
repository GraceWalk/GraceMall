import { ADD_COUNTER, ADD_DETAIL } from './mutation-type'

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_DETAIL] (state, payload) {
    state.details.push({...payload, count: 1})
  }
}