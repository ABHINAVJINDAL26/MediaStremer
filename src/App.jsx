import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Watch from './Pages/Watch'
import Upload from './Pages/Upload'
import Search from './Pages/Search'
import WatchHistory from './Pages/WatchHistory'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch-history" element={<WatchHistory />} />
      </Routes>
    </Layout>
  )
}

export default App
