import React,{useEffect, useState, useMemo} from 'react';
import webbase from '../services/index';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExpandedComponent from '../components/ExpandedColumn';
import { PER_PAGE } from '../utils/TableHelper'

interface DataRow {
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    high_24h: number;
    low_24h: number;
    id: string;
}

const customStyles = {
 
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      paddingLeft: '0 8px',
    },
  }
  
};

const Home =() => {

    const [pending, setPending] = useState(true);
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(PER_PAGE);

    useEffect(()=> {
        fetchData(1)
    },[])

    const columns: TableColumn<DataRow>[] = useMemo(() =>  [
        {
            name: 'Image',
            selector: row => row.image,
            cell: row =>
              row.image ? <img style={{width: '30%',padding: '4% 0%'}} src={row.image} alt={row.name} /> : ""
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Symbol',
            selector: row => row.symbol,
        },
        {
            name: 'Current Price',
            selector: row => row.current_price,
        },
        {
            name: 'High 24 hour Price',
            selector: row => row.high_24h,
        },
        {
            name: 'Low 24 hour Price',
            selector: row => row.low_24h,
        }
    ], []);

    const fetchData =  (page:number, perPage=PER_PAGE) => {
        console.log(perPage)
        console.log(page)
        webbase.getCoins(page, perPage).then((response) => {
            if(response.data) {
              // Add Sucess message
              setPending(false)
              setData(response.data)
              setTotalRows( Object.keys(response.data).length )
              
            }
          }).catch((error) => {
                console.log('error', error);
          });
    }

    const handlePerRowsChange = (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        fetchData(page, newPerPage);
    }

    const handlePageChange = (page: number) => {
        fetchData(page, perPage);
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            progressPending={pending}
            pagination
			//paginationServer
            //paginationTotalRows={totalRows}
            //onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
            customStyles={customStyles}
        />
    );
};

export default React.memo(Home);