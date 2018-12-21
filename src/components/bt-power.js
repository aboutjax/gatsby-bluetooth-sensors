import React, { Component } from 'react'
import { LineChart } from './charts'

class BluetoothPower extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPower: 0,
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: 'rgba(245, 166, 35, 0.50)',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: 'rgba(245, 166, 35, 1)',
            label: 'Power',
          },
        ],
      },
    }
  }

  componentDidMount() {}

  handleCharacteristicValueChanged = event => {
    let value = event.target.value.getInt16(1)

    this.setState({
      currentPower: value,
      data: {
        labels: [...this.state.data.labels, value],
        datasets: [
          {
            data: [...this.state.data.datasets[0].data, value],
            backgroundColor: 'rgba(245, 166, 35, 0.50)',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: 'rgba(245, 166, 35, 1)',
            label: 'Power',
          },
        ],
      },
    })
  }

  requestBluetoothConnection() {
    let handleCharacteristicValueChanged = this.handleCharacteristicValueChanged

    navigator.bluetooth
      .requestDevice({ filters: [{ services: ['cycling_power'] }] })
      .then(device => {
        return device.gatt.connect()
      })
      .then(server => {
        return server.getPrimaryService('cycling_power')
      })
      .then(service => {
        console.log('service')
        return service.getCharacteristic('cycling_power_measurement')
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
            <h2>Power</h2>
            <h1>{this.state.currentPower}</h1>
          </header>
          <button
            className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black bn"
            onClick={this.requestBluetoothConnection.bind(this)}
          >
            Connect Power
          </button>
        </div>
        <div className="mv5">
          <LineChart data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default BluetoothPower
