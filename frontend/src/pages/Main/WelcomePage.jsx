import { PublicNav } from "../Nav";
import "../../Style/Main.css";
function WelcomePage() {

  return (
    <>
      <PublicNav/>
      <div className="welcome-page">
          <h1>Welcome to our Form App</h1>
          <div className="text">
          <p>This application allows you to create, view, and manage forms easily.</p>
          <p> You can create new forms, view your forms, and submit responses to any other forms.</p>
          </div>
        <h4>First time to our app? <a href="/signUp"><button>Sign up</button></a></h4>
        <h4>Already have an account? <a href="/login"><button>Log in</button></a></h4>
    </div>
  </>
  );
  
}

export default WelcomePage;
