
import {BrowserRouter, Routes, Route} from 'react-router-dom' ; //Link
// import Test from './components/Test'
// import Nav from './components/Nav'
import TasksForm from './components/TasksForm';
import TasksList from './components/TasksList';
import Menu from './components/Nav'
import Container from '@mui/material/Container';


function App() {
  return (
    <div className="App">
      {/* <Test/> */}

      <BrowserRouter>
      <Menu/>
        <Container>
          <Routes>
            <Route path ="/" element={<TasksList/>}/>
            <Route path ="/task/" element={<TasksForm/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
      {/* <Nav/> */}
    </div>
  );
}

export default App;
