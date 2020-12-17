import React from "react";
import Register from "./Components/Register";
import EmailSignIn from "./Components/EmailSignIn";
// import GoogleSignIn from "./Components/GoogleSignIn";

function App() {
  return (
    <div className="app">
      {/* <GoogleSignIn /> */}
      <Register />
      <EmailSignIn />
    </div>
  );
}

export default App;
