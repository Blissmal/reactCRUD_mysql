import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Books from './Books'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import Nav from './Nav'

const App = () => {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path='/' element={<Books />}/>
        <Route path='/create' element={<CreateBook />}/>
        <Route path='/update/:id' element={<UpdateBook />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
