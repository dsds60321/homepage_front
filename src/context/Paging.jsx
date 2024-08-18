import React, { createContext, useContext, useState } from 'react';

const PagingContext = createContext();

export const usePaging = () => {
    return useContext(PagingContext);
};

export const PagingProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // 페이지당 아이템 수

    const calculatePagination = (data) => {
        const pageCount = Math.ceil(data.length / itemsPerPage);
        const currentData = data.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage,
        );

        return { pageCount, currentData };
    };

    return (
        <PagingContext.Provider
            value={{ currentPage, setCurrentPage, calculatePagination }}
        >
            {children}
        </PagingContext.Provider>
    );
};
