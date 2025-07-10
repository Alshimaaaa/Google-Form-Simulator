import { useNavigate } from "react-router-dom";
import { PrivateNav } from "../Nav";
import "../../Style/Main.css";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PrivateNav />
      <div className="welcome-page">
        <h1>Welcome!</h1>
        <h3>What would you like to do?</h3>
      <div>
        <button onClick={() => navigate("/createForm")}>Create new form</button>
        <button onClick={() => navigate("/viewMyForms")}>View Your Forms</button>
        <button onClick={() => navigate("/viewAllForms")}>View All Forms</button>
      </div>
    </div>
    </>
  );
}

export default Home;
