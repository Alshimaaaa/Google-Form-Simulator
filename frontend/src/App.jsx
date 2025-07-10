import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Main/SignUp';
import Login from './pages/Main/Login';
import Home from './pages/Main/Home';
import CreateForm from './pages/Form/CreateForm';
import ViewMyForms from './pages/Form/ViewMyForms';
import ViewForm from './pages/Form/ViewForm';
import ViewAllForms from './pages/Form/ViewAllForms';
import SubmitResponse from './pages/Response/SubmitResponse';
import ViewResponses from './pages/Response/ViewResponses';
import WelcomePage from './pages/Main/WelcomePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
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

