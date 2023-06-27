import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { useAuth } from './context/AuthContext';
import AddAdmin from './pages/AddAdmin';
import AllPosts from './pages/AllPosts';
import AllUsers from './pages/AllUsers';
import CreateAPost from './pages/CreateAPost';
import DonateNow from './pages/DonateNow';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';
import MyProfile from './pages/MyProfile';
import MySettings from './pages/MySettings';
import NotFound from './pages/NotFound';
import PaymentAck from './pages/PaymentAck';
import SignUp from './pages/SignUp';
function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Routes>
        {currentUser?._id?.length > 0 ? (
          <>
            <Route exact path='/create-a-post' element={<CreateAPost />} />
            <Route exact path='/my-profile' element={<MyProfile />} />
            <Route exact path='/my-posts' element={<MyPosts />} />
            <Route exact path='/my-settings' element={<MySettings />} />
            <Route exact path='/donate-now' element={<DonateNow />} />
            <Route exact path='/ack/:amount/:msg' element={<PaymentAck />} />
            <Route exact path='/out' element={<Login />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </>
        )}

        {currentUser?.role === 'admin' ? (
          <>
            <Route exact path='/admin' element={<AddAdmin />} />
            <Route exact path='/all-posts' element={<AllPosts />} />
            <Route exact path='/all-users' element={<AllUsers />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </>
        )}
        <Route exact path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
