import { useEffect, useState } from "react";
import "./App.css";
// Add import for the pages here.
import { BrowserRouter as Router,Routes, Route } from "react-router-dom"; // Use this for when navigating without reloading the page
import NavBar from "./NavBar";
import Dictionary from "./Dictionary";
import Profile from "./Profile";
import QuizSite from "./QuizSite";
import QuizStartButton from "./QuizStartButton";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    <Router>
        <NavBar>
            </NavBar>
            
       <Routes>
        // Add the pages here
        <Route path="/quiz" element={<QuizSite />} />
        <Route path="/quiz-start" element={<QuizStartButton />} />

       </Routes>
    </Router>
    

    useEffect(() => {
        fetch("/api/users")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);


    
    //edit here to add new page setup
    return (
        <Router>
            <div className="container">
                <NavBar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <h1>First Aid Learning</h1>
                                <h2>Registered Users!!!:</h2>
                                {loading && <p>Loading users...</p>}
                                {error && <p className="error">Error: {error}</p>}
                                <ul>
                                    {users.map(user => (
                                        <li key={user.user_id}>
                                            <strong>{user.first_name} {user.last_name}</strong> - {user.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        } />

                        <Route path="/quiz" element={<QuizSite/>} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/profile" element={<Profile />} />

                    </Routes>
                </div>
            </div>
        </Router>
    );



}


export default App;



    /*
    return (
        <div className="App">
            <h1>First Aid Learning</h1>
            <h2>Registered Users:</h2>
            {loading && <p>Loading users...</p>}
            {error && <p className="error">Error: {error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        <strong>{user.first_name} {user.last_name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );

    */


