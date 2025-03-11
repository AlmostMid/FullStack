import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
}

export default App;
