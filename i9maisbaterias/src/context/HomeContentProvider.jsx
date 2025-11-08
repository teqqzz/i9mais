import React, { useState, useEffect } from 'react';
import { HomeContentContext } from './HomeContentContext';
import { API_URL } from '@/config';

export const HomeContentProvider = ({ children }) => {
    const [content, setContent] = useState({
        layout: [],
        impactData: {},
        calculatorPrices: {}
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/home-data`)
            .then(res => {
                if (!res.ok) throw new Error('Falha ao carregar dados da Home');
                return res.json();
            })
            .then(data => {
                setContent(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Falha ao carregar HomeContentProvider:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    const value = { ...content, isLoading, error };

    return (
        <HomeContentContext.Provider value={value}>
            {children}
        </HomeContentContext.Provider>
    );
};