import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PrivateNav } from "../Nav";
import "../../Style/Form.css";
function CreateForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "Text", choices: [] }
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === 'type' && value === 'Text') updated[index].choices = [];

    setQuestions(updated);
  };


  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[optIndex].text = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push({text: ""});
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myForm = { name, questions };

    const response = await fetch("http://localhost:8000/createForm/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },

      body: JSON.stringify(myForm),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Form saved successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setMessage("Error saving form: " + (data.message || "Unknown error"));
    }
  };

  return (
    <>
    <PrivateNav />
    <div className="create-form">
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Form title" value={name} onChange={(e) => setName(e.target.value)} required/>

        {questions.map((q, index) => (
          <div key={index} class="question">
            <input placeholder={`Question ${index + 1}`} value={q.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} required/>

            <select value={q.type} onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
            >
              <option value="Text">Written Answer</option>
              <option value="Multiple Choice">MCQ</option>
              <option value="Checkbox">Checkbox</option>
            </select>

            {(q.type === "Multiple Choice" || q.type === "Checkbox") && (
              <div>
                {q.choices.map((opt, j) => (
                  <input key={j} placeholder={`Option ${j + 1}`} value={opt.text} onChange={(e) => handleOptionChange(index, j, e.target.value)} required/>
                ))}
                <button type="button" onClick={() => addOption(index)}> Add Option </button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Save Form</button>
      </form>
      <p>{message}</p>

    </div>
    </>
  );
}

export default CreateForm;
