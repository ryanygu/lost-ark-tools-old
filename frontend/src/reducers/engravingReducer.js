// import { setNotification } from '../reducers/notificationReducer'
import engravingService from '../services/engravings'


const initialState = {
  rate: 75,
  rarity: 'legendary',
  num_nodes: 9,
  line1: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
  line2: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
  line3: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
  history: []
}

const engravingReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'ENGRAVING_INIT':
    return action.data
  case 'ENGRAVING_PASS':
    return action.data
  case 'ENGRAVING_FAIL':
    return action.data
  case 'ENGRAVING_RESET':
    return { ...initialState, history: state.history }
  case 'ENGRAVING_SAVE':
    return { ...initialState, history: [ ...state.history, action.data ] }
  case 'ENGRAVING_GET_STATISTICS':
    return { ...state, history: action.data }
  default:
    return state
  }
}

export const engravingPass = (engravings, type) => {
  console.log('dispatching pass')
  let line1 = engravings.line1
  let line2 = engravings.line2
  let line3 = engravings.line3
  if (type === 'line1') {
    const index = engravings.line1.indexOf('?')
    line1[index] = '+1'
  } else if (type === 'line2') {
    const index = engravings.line2.indexOf('?')
    line2[index] = '+1'
  } else {
    const index = engravings.line3.indexOf('?')
    line3[index] = '+1'
  }

  const rate_change = engravings.rate === 25 ? 0 : 10
  const updatedEngravings = {
    ...engravings,
    rate: engravings.rate - rate_change,
    line1: line1,
    line2: line2,
    line3: line3
  }

  return async dispatch => {
    dispatch({
      type: 'ENGRAVING_PASS',
      data: updatedEngravings
    })
  }
}

export const engravingFail = (engravings, type) => {
  console.log('dispatching fail')
  let line1 = engravings.line1
  let line2 = engravings.line2
  let line3 = engravings.line3
  if (type === 'line1') {
    const index = engravings.line1.indexOf('?')
    line1[index] = 'x'
  } else if (type === 'line2') {
    const index = engravings.line2.indexOf('?')
    line2[index] = 'x'
  } else {
    const index = engravings.line3.indexOf('?')
    line3[index] = 'x'
  }

  const rate_change = engravings.rate === 75 ? 0 : 10
  const updatedEngravings = {
    ...engravings,
    rate: engravings.rate + rate_change,
    line1: line1,
    line2: line2,
    line3: line3
  }

  return async dispatch => {
    dispatch({
      type: 'ENGRAVING_PASS',
      data: updatedEngravings
    })
  }
}

export const engravingSave = (data) => {
  console.log('dispatching save')
  // score: line1 successes + line2 successes + line3 fails
  const score = data.line1.reduce((n, x) => n + (x === '+1'), 0)
                + data.line2.reduce((n, x) => n + (x === '+1'), 0)
                + data.line3.reduce((n, x) => n + (x === 'x'), 0)
  const engraving = {
    rarity: data.rarity,
    score: score,
    line1: data.line1,
    line2: data.line2,
    line3: data.line3
  }
  return async dispatch => {
    await engravingService.save(engraving)
    dispatch({
      type: 'ENGRAVING_SAVE',
      data: engraving
    })
  }
}

export const getStatistics = () => {
  console.log('dispatching getstatistics')
  return async dispatch => {
    const history = await engravingService.get()
    dispatch({
      type: 'ENGRAVING_GET_STATISTICS',
      data: history
    })
  }
}

export const engravingReset = () => {
  console.log('dispatching reset')
  return async dispatch => {
    dispatch({
      type: 'ENGRAVING_RESET',
      data: initialState
    })
  }
}

export const initializeEngravings = () => {
  return async dispatch => {
    dispatch({
      type: 'ENGRAVING_INIT',
      data: {
        rate: 75,
        rarity: 'legendary',
        num_nodes: 9,
        line1: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
        line2: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
        line3: ['?', '?', '?', '?', '?', '?', '?', '?', '?'],
        history: [],
      }
    })
  }
}


export default engravingReducer