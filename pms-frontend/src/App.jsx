
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx'
import IssueDetails from './pages/IssueDetails/IssueDetails.jsx'
import Subscription from './pages/Subscription/Subscription.jsx'
import Auth from './pages/Auth/Auth.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Redux/Auth/Action.js'
import { store } from './Redux/Store.js'
import { fetchProjects } from './Redux/Project/Action.js'
import UpgradeSuccess from './pages/Subscription/UpgradeSuccess.jsx'
import AcceptInvitation from './pages/Project/AcceptInvitation.jsx'
function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store)
  useEffect(() => {
    dispatch(getUser())
  dispatch(fetchProjects({}))  
  },[auth.jwt,dispatch])
  return (<>
    
    {
      auth.user? <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:projectId' element={<ProjectDetails />} />
        <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails />} />
        <Route path='/upgrade_plan' element={<Subscription />} />
          <Route path='/upgrade_plan/success' element={<UpgradeSuccess />} />
          <Route path="/accept_invitation" element={<AcceptInvitation/>}/>
      </Routes>
    </div> : <Auth/>
    }
    </>
  )
}

export default App
