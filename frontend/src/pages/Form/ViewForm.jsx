import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect} from 'react';
import { PrivateNav } from "../Nav";
import "../../Style/Form.css"
function ViewForm() {

    const { id } = useParams();
    const [form, setForm] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchForm = async () => {
        const response = await fetch(`http://localhost:8000/viewForm/${id}/`, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        setForm(data);
        };
        fetchForm();
    }, []);

    if (!form) return <p>Loading form...</p>;

    return (
        <>
        <PrivateNav />
        <div className="view-form">
        <h2>{form.name}</h2>
        <ul className="form-questions">
            {form.questions.map((question, index) => (
            <li key={question.id}>
                <strong>Q{index + 1}: </strong>
                <strong>{question.question}</strong>
                {( question.type === 'Checkbox') && <ul>
                {question.choices.map((choice, j) => (
                    <li key={j}>
                        <input type="checkbox" name={`question-${index}`} value={choice.text}/>
                        <label>{choice.text}</label>
                    </li>
                ))}
                </ul>}
                {( question.type === 'Multiple Choice') && <ul>
                    {question.choices.map((choice, j) => (
                        <li key={j}>
                            <input type="radio" name={`question-${index}`} value={choice.text}/>
                            <label>{choice.text}</label>
                        </li>
                    ))}
                </ul>}
            </li>
            ))}
            
        </ul>
        </div>
        </>
    );
}


export default ViewForm;