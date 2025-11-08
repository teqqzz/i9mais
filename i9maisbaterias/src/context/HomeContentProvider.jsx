import React, { useState, useEffect } from 'react';
import { HomeContentContext } from './HomeContentContext';
import { API_URL } from '@/config';

export const HomeContentProvider = ({ children }) => {
    const [homeContent, setHomeContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/page/home`)
            .then(res => res.json())
            .then(data => {
                setHomeContent(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Falha ao carregar conteúdo da home:", err);
                setIsLoading(false);
            });
    }, []);

    const value = { homeContent, isLoading };

    return (
        <HomeContentContext.Provider value={value}>
            {children}
        </HomeContentContext.Provider>
    );
};