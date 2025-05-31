import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import { Awareness } from "./pages/Awareness";
import { Contact } from "./pages/Contact";
import { Companies } from "./pages/Companies";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import {Logout} from "./pages/Logout";
import { Community } from "./pages/Community";
import { Navbar } from "./components/Navbar";
import {Error} from "./pages/Error";
import { Colleges } from "./pages/Colleges";
import Chat from "./pages/chatRoom";

const App=()=>{
  return <>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/awareness" element={<Awareness />}/>
    {/* <Route path="/contact" element={< />}/>                it is like image tag in html */}
    <Route path="/contact" element={<Contact />}/>
    <Route path="/companies" element={<Companies />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
     <Route path="/community" element={<Community />}/>
     <Route path="/colleges" element={<Colleges />}/>
    <Route path="*" element={<Error />}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/chat" element={<Chat />} />
  </Routes>
  </BrowserRouter>
  </>
};

export default App;