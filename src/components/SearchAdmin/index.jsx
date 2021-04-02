import React,{useState,memo} from 'react'
import './SearchAdmin.scss'
function SearchAdmin(props) {
    const {onSearch, typeSearch}=props
    const [search,setSearch]=useState('');

    const onInputChange = value =>{
        setSearch(value);
        onSearch(value);
    }
    return (
        <div className="search ">
          <form className="d-flex align-items-center">
            {/* <button className="btn btn-white  my-2 my-sm-0" type="submit">
              <i class="fa fa-search"></i>
            </button> */}
            <input
              className="form-control "
              type="search"
              placeholder={typeSearch}
              aria-label="Search"
              value={search}
              onChange={e=>onInputChange(e.target.value)}
            />
          </form>
        </div>
    )
}
export default memo(SearchAdmin)
