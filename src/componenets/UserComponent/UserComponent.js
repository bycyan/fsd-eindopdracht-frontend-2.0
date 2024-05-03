import { useEffect, useState } from "react";
import { getUser } from '../../services/api';
import { useAuth } from "../../context/AuthContext";

const useUser = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(user.id, localStorage.getItem('token'));
                setCurrentUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserData();

        // Clean up any resources (if needed) when the component unmounts
        return () => {
            // Cleanup code here (if any)
        };
    }, []);

    return currentUser;
};

export default useUser;
