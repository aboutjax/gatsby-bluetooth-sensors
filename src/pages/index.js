import React from 'react'

import Layout from '../components/layout'
import BluetoothPower from '../components/bt-power'
import BluetoothHeartRate from '../components/bt-heartrate'

const IndexPage = () => (
  <Layout>
    <BluetoothPower />
    <BluetoothHeartRate />
  </Layout>
)

export default IndexPage
