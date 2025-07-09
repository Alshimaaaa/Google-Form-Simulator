import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SubmitResponse() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState(null);     
  const [answers, setAnswers] = useState({}); 
  const [message, setMessage] = useState(""); 


  useEffect(() => {
    fetch(`http://localhost:8000/viewForm/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);


  const handleAnswerChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleCheckboxChange = (qid, value) => {
    const prev = answers[qid] || [];
    const updated = prev.includes(value)
    ? prev.filter(v => v !== value)
    : [...prev, value];
    setAnswers(prev => ({ ...prev, [qid]: updated }));

  };


  const handleSubmit = async () => {
    const formatAnswer = (a) => Array.isArray(a) ? a.join(", ") : a;
    const myResponse = {
      form: form.id,
      answers: Object.entries(answers).map(([questionId, userAnswer]) => ({
        question: Number(questionId),
        answerText: formatAnswer(userAnswer)
      }))
    };
    console.log("myResponse: ", myResponse);

    const response = await fetch("http://localhost:8000/submitResponse/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(myResponse)
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Response submitted successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setMessage("Error submitting response: " + (data.message || "Unknown error"));
    }
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div>
      <h2>{form.name}</h2>

      {form.questions.map((q) => (
        <div key={q.id}>
          <p><strong>{q.question}</strong></p>

          {q.type === "Text" && (
            <input type="text" onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />
          )}

          {q.type === "Multiple Choice" && q.choices.map((choice, i) => (
            <div key={i}>
              <input type="radio" name={`question${q.id}`} value={choice.text} onChange={() => handleAnswerChange(q.id, choice.text)}/>
              <label>{choice.text}</label>
            </div>
          ))}

          {q.type === "Checkbox" && q.choices.map((choice, i) => (
            <div key={i}>
              <input type="checkbox" name={`question${q.id}`} value={choice.text} onChange={() => handleCheckboxChange(q.id, choice.text)} />
              <label>{choice.text}</label>
            </div>
          ))}
        </div>
      ))}

      <br />
      <button onClick={handleSubmit}>Submit Response</button>
      <p>{message}</p>
    </div>
  );
}

export default SubmitResponse;
