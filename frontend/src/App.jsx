import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserTable from "./components/UserTable";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  
  return (
    <div>
      <Header/>
      <UserTable/>
      <Footer/>
    </div>
  );
}

export default App;
