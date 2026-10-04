import "./App.css";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/lobby" element={<LobbyPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Route>
            </BrowserRouter>
        </>
    );
}

export default App;
