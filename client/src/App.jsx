import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Home,
    About,
    Dashboard,
    Profile,
    Projects,
    SignIn,
    SignUp,
    CreatePost,
} from "./pages";
import { Header, Footer, PrivateRoute } from "./components";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<OnlyAdminPrivateRoute />}>
                    <Route path="/create-post" element={<CreatePost />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
