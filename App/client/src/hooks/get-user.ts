import { useEffect, useState } from 'react';
import axios from 'axios'; // or use fetch API

const getUser = () => {
    const [jwt, setJwt] = useState<string | null>(null);

    useEffect(() => {
        const fetchSessionJwt = async () => {
            try {
                const response = await axios.get('/auth/user/currentuser'); // Replace with your server endpoint
                const sessionData = response.data;
                if (sessionData && sessionData.jwt) {
                    setJwt(sessionData.jwt);
                }
            } catch (error) {
                console.error('Error fetching session JWT:', error);
            }
        };

        fetchSessionJwt();
    }, []);

    return jwt;
};

export default getUser;
