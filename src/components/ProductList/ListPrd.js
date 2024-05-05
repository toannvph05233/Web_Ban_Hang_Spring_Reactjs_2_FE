import React, {useEffect, useState} from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";
import ReactPaginate from "react-paginate";
import axios from "axios";

const ListPrd = ({categories}) => {
    const [page, setPage] = useState(0);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const id = categories;
            const response = await axios.get('http://localhost:8080/api/products/category/' + id);
            const allProducts = response.data;
            const startIndex = page * perPage;
            const endIndex = startIndex + perPage;
            const paginatedProducts = allProducts.slice(startIndex, endIndex);
            setProductList(paginatedProducts);
            setTotalPages(Math.ceil(allProducts.length / perPage));
        };
        fetchData();
    }, [page, perPage]);
    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected);
    };

    return (
        <>
            <div className='product-lists grid bg-whitesmoke my-3'>
                {
                    productList.map(product => {
                        let discountedPrice = (product.price) - (product.price * (product.promotion / 100));

                        return (
                            <div>
                                <Product key={product.id} product={{...product, discountedPrice}}/>

                            </div>

                        )
                    })
                }

            </div>
            <div style={{marginTop:'40px' }}>
                {totalPages > 1 ?
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination-container'}
                    activeClassName={'active'}
                    previousClassName={'previous'}
                    nextClassName={'next'}
                    pageClassName={'page'}
                    disabledClassName={'disabled'}
                    breakClassName={'break-me'}
                    previousLabel={'<'} // Đổi tên cho nút previous
                    nextLabel={'>'}
                    style={{
                        backgroundColor: '#3498db',  // Đổi màu sắc nền chung
                        color: '#fff',               // Đổi màu sắc chữ
                    }}
                /> : <div></div>}
            </div>
        </>

    )
}

export default ListPrd