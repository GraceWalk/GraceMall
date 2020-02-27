import { ADD_COUNT, ADD_DETAIL, MINUS_COUNT, REVERSE_CHECK, CHECK_ALL } from './mutation-type'

export default {
  [ADD_COUNT] (state, payload) {
    payload.count++
  },
  [MINUS_COUNT] (state, payload) {
    payload.count > 1 ? payload.count-- : payload.count
  },
  [ADD_DETAIL] (state, payload) {
    state.details.push({...payload, count: 1, isChecked: false})
  },
  [REVERSE_CHECK] (state, payload) {
    payload.isChecked = !payload.isChecked
    let notAllChecked = state.details.some(detail => detail.isChecked === false)
    if (notAllChecked) {
      state.allSelected = false
    } else {
      state.allSelected = true
    }
  },
  [CHECK_ALL] (state) {
    state.details.map(detail => detail.isChecked = true)
    if (state.details.length) {
      state.allSelected = true
    }
  }
}