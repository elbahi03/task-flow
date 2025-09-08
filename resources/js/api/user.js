import axios from 'axios';

export const fetchUser = async () => {
    try {
        const response = await axios.get('/user-profile');
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};