import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome!</h1>
      <p>What would you like to do?</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/createForm")}>Create new form</button>
        <button onClick={() => navigate("/viewMyForms")}>View Your Forms</button>
        <button onClick={() => navigate("/viewAllForms")}>View All Forms</button>
      </div>
    </div>
  );
}

export default Home;
