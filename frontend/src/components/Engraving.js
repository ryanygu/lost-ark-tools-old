import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Button
} from '@material-ui/core'
import { engravingSave, engravingReset, engravingPass, engravingFail } from '../reducers/engravingReducer'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const EngravingNode = ({ text }) => {
  return (<span>[ {text} ]</span>)
}

const EngravingLine = ({ engravings, type }) => {
  const dispatch = useDispatch()
  let engravingText, engravingNodes
  if (type === 'line1') {
    engravingNodes = engravings.line1
    engravingText = 'Success rate:'
  } else if (type === 'line2') {
    engravingNodes = engravings.line2
    engravingText = 'Success rate:'
  } else {
    engravingNodes = engravings.line3
    engravingText = 'Chance of cracking:'
  }

  const handleEngravingClick = (engravings, engravingNodes, type) => {
    const roll = Math.floor(Math.random() * 101)
    if (engravingNodes.indexOf('?') === -1) {
      window.alert('line disabled: all nodes completed')
      return
    }
    if (roll < engravings.rate) {
      dispatch(engravingPass(engravings, type))
    } else {
      dispatch(engravingFail(engravings, type))
    }
  }

  return (
    <div>
      {engravingNodes ? Array.from({ length: 9 }, (x, i) => {
        return <EngravingNode key={i} text={engravingNodes[i]} />
      }) : null}
      {engravingText} {engravings.rate}%
      <Button sx={{ verticalAlign: 'center' }} value={type} onClick={() => handleEngravingClick(engravings, engravingNodes, type)}>go</Button>
    </div>
  )
}

const EngravingOptions = ({ engravings }) => {
  const dispatch = useDispatch()
  // TODO: rare6, epic8, legendary9, relic10

  const handleEngravingReset = (e) => {
    e.preventDefault()
    dispatch(engravingReset())
  }

  const handleEngravingSave = (e) => {
    e.preventDefault()
    if (engravings.line1.indexOf('?') === -1 && engravings.line2.indexOf('?') === -1 && engravings.line3.indexOf('?') === -1) {
      dispatch(engravingSave(engravings))
      return
    }
    window.alert('cannot save: not all nodes are filled')
  }

  return (
    <div>
      <Button sx={{ verticalAlign: 'center' }} onClick={handleEngravingReset}>reset</Button>
      <Button sx={{ verticalAlign: 'center' }} onClick={handleEngravingSave}>save</Button>
    </div>
  )
}

const EngravingStatistics = ({ engravings }) => {


  const scores = engravings.history.map(e => e.score)
  const min = Math.min(...scores)
  const max = Math.max(...scores)

  const sum = scores.reduce((a, b) => a + b, 0)
  const avg = (sum / scores.length) || 0

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Performance records',
      },
    },
  }
  const labels = Array.from({ length: scores.length }, (_, i) => i+1)
  const data = {
    labels,
    datasets: [
      {
        label: 'My scores',
        data: labels.map(i => scores[i-1]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>Attempts: {scores.length}</p>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Average: {avg}</p>
      <div><Line options={options} data={data} /></div>
    </div>
  )
}

const Engraving = ({ engravings, user }) => {

  return (
    <>
      <h1>Ability Stones Faceting Practice</h1>
      <EngravingOptions engravings={engravings} user={user}/>
      <EngravingLine engravings={engravings} type='line1' />
      <EngravingLine engravings={engravings} type='line2' />
      <EngravingLine engravings={engravings} type='line3' />
      <EngravingStatistics engravings={engravings} user={user} />
    </>
  )

}


export default Engraving