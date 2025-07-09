import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import ViewMyForms from './pages/ViewMyForms';
import ViewForm from './pages/ViewForm';
import ViewAllForms from './pages/ViewAllForms';
import SubmitResponse from './pages/SubmitResponse';
import ViewResponses from './pages/ViewResponses';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/createForm" element={<CreateForm />} />
        <Route path="/viewMyForms" element={<ViewMyForms />} />
        <Route path="/viewForm/:id" element={<ViewForm />} />
        <Route path="/viewAllForms" element={<ViewAllForms />} />
        <Route path="/submitResponse/:id" element={<SubmitResponse />} />
        <Route path="/viewResponses/:formId" element={<ViewResponses />} />
      </Routes>
    </Router>
  );
}
export default App;

