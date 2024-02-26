import './WebHome.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="mainpage">
      <div className="div">
        <div className="group">
          <div className="overlap-group">
            <Link to="/login">
            <button className="login-button">Log in</button>
            </Link>
          </div>
          <div className="group-2">
            <div className="text-wrapper-2">Find Unique Recipes Fast</div>
            <div className="text-wrapper-3">YES, CHEF</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
