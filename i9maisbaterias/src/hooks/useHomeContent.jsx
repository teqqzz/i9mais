import { useContext } from 'react';
import { HomeContentContext } from '../context/HomeContentContext';

export const useHomeContent = () => {
    const context = useContext(HomeContentContext);
    if (context === undefined) {
        throw new Error('useHomeContent deve ser usado dentro de um HomeContentProvider');
    }
    return context;
};