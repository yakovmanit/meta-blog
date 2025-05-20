import Header from "./components/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import AddPost from "./pages/AddPost.tsx";
import FullPost from "./pages/FullPost.tsx";
import Footer from "./components/Footer.tsx";
import UserEdit from "./pages/UserEdit.tsx";
import FullUser from "./pages/FullUser.tsx";

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
          <Route path='/account/edit' element={<UserEdit />} />
          <Route path='/posts/add-new' element={<AddPost />} />
          <Route path='/posts/edit/:id/' element={<AddPost />} />
          <Route path='/posts/:id/' element={<FullPost />} />
          <Route path='/users/:id/' element={<FullUser />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
