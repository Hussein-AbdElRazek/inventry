import Modal from '../ui/Modal'
import ProductTable from '../ProductTable'

const SearchResult = (props) =>
{

    const { 
        isSearchResultOpen, 
        setSearchResultOpen, 
        isLoadingGetSpecificCategory, 
        searchResultData ,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalNumberOfItems,
    } = props;
    return (
        <Modal open={isSearchResultOpen} setOpen={setSearchResultOpen}>
            <ProductTable
                rows={searchResultData}
                isLoading={isLoadingGetSpecificCategory}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalNumberOfItems={totalNumberOfItems}
            />
        </Modal>
    )
}

export default SearchResult