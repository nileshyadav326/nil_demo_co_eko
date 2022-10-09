import React, { useState, useEffect } from 'react';
import webbase from '../services/index';

import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 2%;
`

const Table = styled.div`
    display: table;
    width: 100%;
`
const TableRow = styled.div`
    display: table-row;
`

const TableCell = styled.div`
    border: 1px solid #999999;
    display: table-cell;
    padding: 3px 10px;
`

const TableBody = styled.div`
    display: table-row-group;
`

const ExpandedComponent = (props: any) => {

    const [data, setData] = useState({
        hashing_algorithm: null,
        description: { en: '' },
        links: { homepage: [] },
        genesis_date: null,
        market_cap: { eur: null },
        symbol: '',
        name: '',
    });

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        webbase.getCoinsById(props.data.id).then((response: any) => {
            console.log(data);
            setData(response.data)
            setLoading(false)
        });
    }, [])

    console.log(props)
    return (
        <>
            <div>
                <h1>Details of {props.data.name}</h1>
            </div>
            {!loading ?
                <Wrapper>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {data.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Symbol
                                </TableCell>
                                <TableCell>
                                    {data.symbol}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Hashing algorithm
                                </TableCell>
                                <TableCell>
                                    {data.hashing_algorithm}
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell dangerouslySetInnerHTML={{ __html: data?.description?.en }} />

                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Market cap in Euro
                                </TableCell>
                                <TableCell>
                                    {data?.market_cap?.eur}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Homepage
                                </TableCell>
                                <TableCell>
                                    {data?.links?.homepage && data?.links?.homepage.length > 0 ?
                                        data?.links?.homepage.map((val, index) => {
                                            return ((val && val != '') ? <p key={index}>{val}</p> : null)
                                        })
                                        : null}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Genesis Date
                                </TableCell>
                                <TableCell>
                                    {data.genesis_date}
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>


                </Wrapper>
                : null}
        </>
    )
}

export default ExpandedComponent