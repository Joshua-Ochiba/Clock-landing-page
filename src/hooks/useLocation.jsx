import React from 'react'
import { useState, useEffect } from 'react'

export const useLocation = () => {
    const [locationData, setLocationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) {
                    throw new Error('Failed to fetch location data');
                }
                const data = await response.json();
                setLocationData({
                    city: data.city,
                    country: data.country,
                    countryCode: data.countryCode,
                    timezone: data.timezone,
                    ip: data.ip,
                })
            }
            catch (error) {
                console.error('Error fetching location data:', error.message);
                setError(error.message);
                //
                setLocationData({
                    city: 'Lagos',
                    country: 'Nigeria',
                    countryCode: 'NG',
                    timezone: 'Africa/Lagos',
                    ip: 'Unknown'
                })
            }
            finally {
                setLoading(false);
            }
        }

        fetchLocation();
    }, []);

    return { locationData, loading, error };
}

