import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import AuthRootState from "./models/AuthRootState";
import "./App.css";
import MyCollections from "./components/Collections/MyCollections";

function App() {
  const user = useSelector((state: AuthRootState) => state.authSlice.user);
  return (
    <div className="App">
      <Auth />
      {user.uid ? <MyCollections /> : <p>Login to see your notations</p>}
    </div>
  );
}

export default App;
