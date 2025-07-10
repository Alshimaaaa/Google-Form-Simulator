import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';
import { PrivateNav } from "../Nav";
import "../../Style/Form.css";
function ViewMyForms() {
    useEffect(() => {
    fetchForms();
    }, []);

  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem("token");

  const fetchForms = async () => {
      const response = await fetch("http://localhost:8000/viewMyForms/", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      setForms(data);
  };

  return (
    <>
    <PrivateNav />
    <div className="create-form">
      <h2>Your Forms</h2>
      {forms.length === 0 && (
        <p>You haven't created any forms.</p>
      )}
      <ul>
        {forms.map(form => (
          <li key={form.id}>
            <h3>{form.name}</h3>
            <p>No of questions: {form.questions.length}</p>
            <button onClick={() => navigate(`/viewForm/${form.id}`)}>View Form</button>
            <button onClick={() => navigate(`/viewResponses/${form.id}`)}>View Responses</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ViewMyForms;
