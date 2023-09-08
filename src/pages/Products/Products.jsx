import React, { useEffect, useState } from 'react'

import ProductsUi from './ProductsUi'
import useHttp from '../../hooks/use-http';

const Products = () =>
{
    const {
        isLoading: isLoadingGetAllProducts,
        sendRequest: getAllProducts
    } = useHttp();
    const {
        isLoading: isLoadingAddProduct,
        sendRequest: addProduct,
        error: errorAddProduct,
    } = useHttp();
    const {
        isLoading: isLoadingUpdateProduct,
        sendRequest: editProduct,
        error: errorUpdateProduct
    } = useHttp();
    const {
        isLoading: isLoadingDeleteProduct,
        sendRequest: deleteProduct,
        error: errorDeleteProduct,
    } = useHttp();

    // i use indexing of pages from zero to handle pagination with data grid
    // and i use in api currentPage + 1 because index from 1
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

    const [products, setProducts] = useState([]);

    //get all product from data base
    useEffect(() =>
    {
        const getResponse = ({ message, data, numOfPages, totalNumOfItems, numOfItems }) =>
        {
            if (message === "success")
            {
                data = data.map((product) => ({ ...product, id: product._id, _id: undefined, __v: undefined, }))
                setProducts(data)

                if (numOfPages !== totalPages) setTotalPages(numOfPages)
                if (totalNumOfItems !== totalNumberOfItems) setTotalNumberOfItems(totalNumOfItems)
                if (pageSize !== numOfItems) setPageSize(numOfItems)
            }
        };
        if (currentPage < totalPages)
        {
            getAllProducts(
                {
                    url: `getAllProducts?page=${currentPage + 1}&limit=10`,
                    method: "GET",
                },
                getResponse
            );
        }
    }, [currentPage])
    
    const handleAddProduct = async (values) =>
    {
        let isOk = false;
        let newProductId = null;
        const getResponse = async ({ message, productId }) =>
        {
            if (message === "success")
            {
                isOk = true;
                newProductId = productId;
            }
        };
        await addProduct(
            {
                url: "addProduct",
                method: "POST",
                body: values,
            },
            getResponse
        );
        return { isOk: isOk, newProductId:newProductId }
    }
    const handleUpdateProduct = async (values, productId) =>
    {
        let isOk = false;
        const getResponse = async ({ message }) =>
        {
            if (message === "success")
            {
                isOk = true;
            }
        };
        await editProduct(
            {
                url: `updateProduct/${productId}`,
                method: "PUT",
                body: values,
            },
            getResponse
        );
        return isOk;
    }
    const handleDeleteProduct = async (productId) =>
    {
        let res = false;
        const getResponse = async ({ message }) =>
        {
            if (message === "success")
            {
                res = true;;
            }
        };
        await deleteProduct(
            {
                url: `deleteProduct/${productId}`,
                method: "DELETE",
            },
            getResponse
        );
        return res;
    }
    return (
        <ProductsUi
            products={products}
            isLoadingGetAllProducts={isLoadingGetAllProducts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalNumberOfItems={totalNumberOfItems}

            handleAddProduct={handleAddProduct}
            errorAddProduct={errorAddProduct}
            isLoadingAddProduct={isLoadingAddProduct}
            handleUpdateProduct={handleUpdateProduct}
            errorUpdateProduct={errorUpdateProduct}
            isLoadingUpdateProduct={isLoadingUpdateProduct}
            handleDeleteProduct={handleDeleteProduct}
            errorDeleteProduct={errorDeleteProduct}
            isLoadingDeleteProduct={isLoadingDeleteProduct}
        />
    )
}

export default Products