import Header from "./components/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Account from "./pages/Account.tsx";
import AddPost from "./pages/AddPost.tsx";
import FullPost from "./pages/FullPost.tsx";
import Footer from "./components/Footer.tsx";
import UserEdit from "./pages/UserEdit.tsx";

function App() {
  return (
    <div>
      <div className="flex justify-between flex-col min-h-dvh">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/edit' element={<UserEdit />} />
          <Route path='/posts/add-new' element={<AddPost />} />
          <Route path='/posts/edit/:id/' element={<AddPost />} />
          <Route path='/posts/:id/' element={<FullPost />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
