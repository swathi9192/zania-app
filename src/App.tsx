import './App.css'
import { DeviceStatusGrid } from './components/deviceStatusGrid/DeviceStatusGrid'

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
      <h2>Datagrid</h2>
      <DeviceStatusGrid />
    </div>
  )
}

export default App
