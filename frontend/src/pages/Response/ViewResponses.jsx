import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PrivateNav } from "../Nav";
import "../../Style/Response.css";
function ViewResponses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8000/viewResponses/${formId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setResponses(data));

    fetch(`http://localhost:8000/viewForm/${formId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setForm(data));
  }, [formId]);


  return (
    <>
    <PrivateNav />
    <div className="view-responses">
      <h2>Responses for Form: {form ? form.name : `#${formId}`}</h2>
      {responses.length === 0 && <p>No responses yet.</p>}
      {responses.map((response, i) => (
        <div key={i} className="response-container">
          <p><strong>Answered by:</strong> {response.answeredBy.username}</p>
          <p><strong>Answered Questions:</strong></p>
          <ul>
            {response.answers.map((ans, j) => (
              <li key={j}>
                <strong>Question: </strong> {ans.questionText}<br/>
                <strong>Question Type: </strong> {ans.questionType}<br/>
                <strong>Answer:</strong> {ans.answerText}<br/>

              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </>
  );
}

export default ViewResponses;
