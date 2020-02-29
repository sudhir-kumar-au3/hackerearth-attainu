// import React,{useState, useEffect} from 'react'
// import baseApi from '../service/baseApi';
// import {Link} from 'react-router-dom';
// function Home() {
//     const [loadData, setLoadData] = useState({
//         pager: {},
//         pageOfData: []
//     });
//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const page = parseInt(params.get('page')) || 1;
//         if(page !== loadData.pager.currentPage){
//             baseApi.get(`/api/data?page=${page}`)
//             .then(res => res.json())
//             .then(({pager, pageOfData}) => {
//                 setLoadData({...loadData, pager, pageOfData});
//                 console.log("loadData: ", loadData)
//             })
//         }
        
//     }, [loadData])
//     return (
        
//         <React.Fragment>
//             <footer className='card-footer pb-0 pt-3'>
//                 {loadData.pager.pages && loadData.pager.pages.length &&
//                 <ul className='pagination'>
//                     <li className={`page-item first-item ${loadData.pager.currentPage === 1 ? 'disabled': ""}`}>
//                         <Link to ={{search: `?page=1`}} className='page-link'>First</Link>
//                     </li>
//                     <li className={`page-item previous-item ${loadData.pager.currentPage === 1 ? 'disabled' : ''}`}>
//                         <Link to={{ search: `?page=${loadData.pager.currentPage - 1}` }} className="page-link">Previous</Link>
//                     </li>
//                     {loadData.pager.pages.map(page =>
//                     <li key={page} className={`page-item number-item ${loadData.pager.currentPage === page ? 'active' : ''}`}>
//                         <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
//                     </li>
//                     )}
//                     <li className={`page-item next-item ${loadData.pager.currentPage === loadData.pager.totalPages ? 'disabled' : ''}`}>
//                         <Link to={{ search: `?page=${loadData.pager.currentPage + 1}` }} className="page-link">Next</Link>
//                     </li>
//                     <li className={`page-item last-item ${loadData.pager.currentPage === loadData.pager.totalPages ? 'disabled' : ''}`}>
//                         <Link to={{ search: `?page=${loadData.pager.totalPages}` }} className="page-link">Last</Link>
//                     </li>
//                 </ul>
//                 }
//             </footer>
//         </React.Fragment>
//     )
// }

// export default Home

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import baseApi from '../service/baseApi';
function Home() {
    const [loanData, setLoanData] = useState([]);
    const [limitSize, setLimitSize] = useState(10)

    const onLoadMore = () => {
        setLimitSize(limitSize + 10)
    }
    useEffect(() => {
        baseApi.get(`/`).then(res =>{
            console.log(res)
            setLoanData(res.data);
            console.log('loanData: ', loanData)
        })
    }, [])
    return (
        <div>
            
                    <table className = "table table-hover p-2">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Member Id</th>
                                <th>Loan Amount</th>
                                <th>Intrest Rate</th>
                                <th>Annual Income</th>
                                <th>Loan Term</th>
                                <th>Verification Status</th>
                                <th>Issue Data</th>
                                <th>Last Paid On</th>
                                <th>Amount Last Paid</th>
                                <th>House Ownership</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (loanData.length > 0)?
                                (
                                    loanData.slice(0 , limitSize).map((data, index) =>{
                                        return(
                                            
                                            <tr key ={index} >
                                                <Link to ={`/${data.member_id}`}><td>{data.member_id}</td></Link>
                                                <td>{data.loan_amnt}</td>
                                                <td>{data.int_rate}</td>
                                                <td>{data.annual_inc}</td>
                                                <td>{data.term}</td>
                                                <td>{data.verification_status}</td>
                                                <td>{data.issue_d}</td>
                                                <td>{data.last_pymnt_d}</td>
                                                <td>{data.last_pymnt_amnt}</td>
                                                <td>{data.home_ownership}</td>
                                            </tr>
                                            
                                        )
                                    })
                                 )
                                :'Loading...'
                            }
                        </tbody>
                    </table>
                    <div className="text-center"><button className='btn btn-info' onClick={onLoadMore}>Load More</button></div>
        </div>
    )
}

export default Home
