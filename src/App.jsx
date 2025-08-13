import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import NotFound from './pages/NotFound'
import CategoryPage from './pages/CategoryPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:categoryName/topic/:topicId' element={<TopicPage />} />
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
