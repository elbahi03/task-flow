import React, { useEffect, useState } from 'react';
import { fetchUser } from '../api/user';
const UserProfile = () => {
    const [user, setUser] = useState(null);
const getUser = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData.user);
                console.log("userData", userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
        </div>
    );
};

export default UserProfile;