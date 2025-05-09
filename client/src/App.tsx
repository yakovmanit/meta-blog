import Header from "./components/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Account from "./pages/Account.tsx";

function App() {
  return (
    <div>
      <div className="custom-container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/*<Route path='/account/:id' element={<Account />} />*/}
          <Route path='/account' element={<Account />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
