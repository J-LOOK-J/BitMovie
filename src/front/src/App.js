import './App.css';
import RouterMain from "./routers/RouterMain";
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
        <RouterMain/>
      </BrowserRouter>
  );
}

export default App;
