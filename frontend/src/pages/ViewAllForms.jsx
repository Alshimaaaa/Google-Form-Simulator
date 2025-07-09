import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';
function ViewAllForms() {
    useEffect(() => {
        fetchForm();
    }, []);

    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const token = localStorage.getItem("token");

    const fetchForm = async () => {
        const response = await fetch(`http://localhost:8000/viewAllForms/`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setForms(data);
        } else {
            console.error("Failed to fetch form");
        }
    };

    return (
        <div className="view-form">
            <h2>All Forms</h2>
            {forms.length === 0 && (<p>No available forms</p>)}
            <ul>
        {forms.map(form => (
          <li key={form.id}>
            <h3>{form.name}</h3>
            <p>Questions: {form.questions.length}</p>
            <button onClick={() => navigate(`/submitResponse/${form.id}`)}>Submit Response</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ViewAllForms;