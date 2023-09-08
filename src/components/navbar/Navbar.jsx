import React, { useEffect, useState } from 'react'
import NavbarUi from './NavbarUi'
import useHttp from '../../hooks/use-http';
import SearchResult from './SearchResult';

const Navbar = () =>
{
    const {
        isLoading: isLoadingGetSpecificCategory,
        sendRequest: getSpecificCategory,
    } = useHttp();
    const [searchResultData, setSearchResultData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [category, setCategory] = useState(null);
    const handleGetSpecificCategory = (category) =>
    {
        const getResponse = async ({ message, data, numOfPages, totalNumOfItems, numOfItems }) =>
        {
            if (message === "success")
            {
                setSearchResultData(data.map(ele => ({ ...ele, id: ele._id })));
                if (numOfPages !== totalPages) setTotalPages(numOfPages)
                if (totalNumOfItems !== totalNumberOfItems) setTotalNumberOfItems(totalNumOfItems)
                if (pageSize !== numOfItems) setPageSize(numOfItems)
                setSearchResultOpen(true);
            }
        };
        if (currentPage < totalPages)
            getSpecificCategory(
                {
                    url: `getSpecificCategory/${category}?limit=${5}&page=${currentPage + 1}`,
                    method: "GET",
                },
                getResponse
            );
    }
    const handleSearch = (values) =>
    {
        if (values.searchBy === "category")
        {
            handleGetSpecificCategory(values.searchValue)
            setCategory(values.searchValue)
        }
    }
    useEffect(() =>
    {
        if (category)
        {
            handleGetSpecificCategory(category)
        }
    }, [category, currentPage])
    const [isSearchResultOpen, setSearchResultOpen] = useState(false)
    return (
        <>
            <NavbarUi handleSearch={handleSearch} isLoadingSearch={isLoadingGetSpecificCategory} />
            <SearchResult
                isSearchResultOpen={isSearchResultOpen}
                setSearchResultOpen={setSearchResultOpen}
                searchResultData={searchResultData}

                handleGetSpecificCategory={handleGetSpecificCategory}
                isLoadingGetSpecificCategory={isLoadingGetSpecificCategory}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalNumberOfItems={totalNumberOfItems}
            />
        </>
    )
}

export default Navbar