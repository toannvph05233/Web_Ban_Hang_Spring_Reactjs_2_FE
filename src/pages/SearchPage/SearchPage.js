import React, {useEffect, useState} from 'react';
import "./SearchPage.scss";
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import {searchProductByName} from "../../service/ProductService";

const SearchPage = () => {
  const {searchTerm } = useParams();
  const [searchProductsStatus , setSearchProductsStatus] = useState([]);

  useEffect(() => {
    searchProductByName(searchTerm).then((res) => {
      setSearchProductsStatus(res.data);
    })
  }, [searchTerm]);

  if(searchProductsStatus.length === 0){
    return (
      <div className='containerr' style = {{
        minHeight: "70vh"
      }}>
        <div className='fw-5 text-danger py-5'>
          <h3>Not Products found.</h3>
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className='search-content bg-whitesmoke'>
        <div className='containerr'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            {
              searchProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {searchProductsStatus} />
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;