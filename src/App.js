import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2000}/>
        <RoutesApp/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
