import { useState, useEffect, version } from 'react'
import './App.css'
import Barchart from './components/bar'
import { UserData } from './data'
import axios from 'axios'
import NpmPackageStatsGraph from './1'

function App() {
  return ( 
      <>   
        <div  className='bg-slate-800 text-white h-[100vh]'>
      <NpmPackageStatsGraph />
    </div>
    </>



  )
}

export default App
