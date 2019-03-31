import React, { Component } from 'react'
import { LineChart } from './charts'

class BluetoothHeartRate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentHeartRate: 0,
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: 'rgba(245, 35, 35, 0.50)',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: 'rgba(245, 35, 35, 1)',
            label: 'Heart Rate',
          },
        ],
      },
      highestHearRate: 0,
    }
  }

  componentDidMount() {}

  handleCharacteristicValueChanged = event => {
    let value = event.target.value.getUint8(1)

    let dataArray = this.state.data.datasets[0].data
    let highestData = Math.max(...dataArray)

    this.setState({
      currentHeartRate: value,
      data: {
        labels: [...this.state.data.labels, value],
        datasets: [
          {
            data: [...this.state.data.datasets[0].data, value],
            backgroundColor: 'rgba(245, 35, 35, 0.50)',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: 'rgba(245, 35, 35, 1)',
            label: 'Heart Rate',
          },
        ],
      },
      highestHearRate: highestData,
    })
  }

  requestBluetoothConnection() {
    let handleCharacteristicValueChanged = this.handleCharacteristicValueChanged

    navigator.bluetooth
      .requestDevice({ filters: [{ services: ['heart_rate'] }] })
      .then(device => {
        return device.gatt.connect()
      })
      .then(server => {
        return server.getPrimaryService('heart_rate')
      })
      .then(service => {
        console.log('service')
        return service.getCharacteristic('heart_rate_measurement')
      })
      .then(characteristic => characteristic.startNotifications())
      .then(characteristic => {
        characteristic.addEventListener(
          'characteristicvaluechanged',
          handleCharacteristicValueChanged
        )
        console.log('Notifications have been started.')
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <div className="flex justify-between items-center">
          <header>
            <h2>Current Heart Rate</h2>
            <h1>{this.state.currentHeartRate}</h1>

            <h2>Max Heart Rate</h2>
            <h1>{this.state.highestHearRate}</h1>
          </header>
          <button
            className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black bn"
            onClick={this.requestBluetoothConnection.bind(this)}
          >
            Connect Heart Rate
          </button>
        </div>
        <div className="mv5">
          <LineChart data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default BluetoothHeartRate
