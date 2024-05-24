import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          {/* <label>Email:</label> */}
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          {/* <label>Password:</label> */}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit" className="primary">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="text-center py-2 text-gray-500">
          <p>Don't have an account yet?</p>
          <Link className="underline text-black" to={"/signup"}>
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
