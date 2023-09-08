import React, { useEffect, useState } from 'react'
import { useSnackbar } from "notistack";

import NavbarUi from './NavbarUi'
import useHttp from '../../hooks/use-http';
import SearchResult from './SearchResult';

const Navbar = () =>
{
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const {
        isLoading: isLoadingGetSpecificCategory,
        sendRequest: getSpecificCategory,
    } = useHttp();
    const [searchResultData, setSearchResultData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [productCategory, setProductCategory] = useState(null);
    const [productName, setProductName] = useState(null);
    const handleGetSearchData = (searchValue, by) =>
    {
        const getResponse = async ({ message, data, numOfPages, totalNumOfItems, numOfItems }) =>
        {
            if (message === "success")
            {
                setSearchResultData(data.map(ele => ({ ...ele, id: ele._id })));
                if (numOfPages !== totalPages) setTotalPages(numOfPages||1)
                if (totalNumOfItems !== totalNumberOfItems) setTotalNumberOfItems(totalNumOfItems)
                if (pageSize !== numOfItems) setPageSize(numOfItems)
                if(data.length>0)setSearchResultOpen(true);
                else popMessage("No data found")
            }
        };
        if (currentPage < totalPages)
            getSpecificCategory(
                {
                    url: `getSpecific${by}/${searchValue}?limit=${10}&page=${currentPage + 1}`,
                    method: "GET",
                },
                getResponse
            );
    }
    const [newSearch, setNewSearch] = useState(0);
    const handleSearch = (values) =>
    {
        setNewSearch((prev) => prev + 1)
        if (values.searchBy === "category")
        {
            setProductCategory(values.searchValue)
            setProductName(null);
        } else
        {
            setProductName(values.searchValue)
            setProductCategory(null);
        }
    }
    useEffect(() =>
    {
        if (productCategory)
        {
            handleGetSearchData(productCategory, "Category")
        }
    }, [productCategory, currentPage, newSearch])
    useEffect(() =>
    {
        if (productName)
        {
            console.log("get data productName")
            handleGetSearchData(productName, "Product")
        }
    }, [productName, currentPage, newSearch])
    const [isSearchResultOpen, setSearchResultOpen] = useState(false)
    return (
        <>
            <NavbarUi handleSearch={handleSearch} isLoadingSearch={isLoadingGetSpecificCategory} />
            <SearchResult
                isSearchResultOpen={isSearchResultOpen}
                setSearchResultOpen={setSearchResultOpen}
                searchResultData={searchResultData}

                handleGetSearchData={handleGetSearchData}
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