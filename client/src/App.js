
import Videos from '../src/components/Upload/Components/Videos/Videos'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
import VideoPlayer from '../src/components/Upload/Components/VideoPlayer/VideoPlayer';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Upload from '../src/components/Upload/Components/Upload/Upload';
import VideoDisplay from '../src/components/Upload/Components/Videodisplay/VideoDisplay';
import Signup from "./components/Signup/signUp";
import Login from "./components/Login/signIn";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";




const App = () =>  {
    const user = localStorage.getItem("user");
    const [modal, setModal] = useState(false)

    return (
        <BrowserRouter>
            <div className="App">

                <Routes>

                    {user && <Route path="/user/" exact element={<><Navbar /><Home />  </>} />}

                    {user && <Route path="/user/upload/" exact element={<Upload />} />}

                    {user && <Route path='/user/videos/' element={<Videos />} />  }

                    {user && <Route path='/videos/:id' element={<VideoPlayer />} />}

                    {user && <Route path='/video/' element={<VideoDisplay />} />}
                    
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    
                </Routes>
                {modal && <div className="overlay" onClick={() => setModal(false)}></div>}
            </div >
        </BrowserRouter>

    );
}



export default App;
