import React, { useEffect, useState } from 'react';

// import ProductDetails from './ProductDetails/ProductDetails';
import './ManageMyVoucher.css';

const ManageMyVoucher = () => {
    const [managers, setManagers] = useState([]);
    useEffect(() => {
         fetch('https://localhost:44344/api/Voucher/All')
         .then(res => res.json())
         .then(result => setManagers(result))
         }, [managers])
         const handleDelete=(id)=>{
              console.log(id);
              const proceed=window.confirm(`Are you sure, To delete ,id is ${id}`);
              if(proceed){
              fetch(`https://localhost:44352/api/Manager/delete/${id}`,{
              method: 'POST'
              })
              .then(res => res.json())
              .then(data=>{
              if(data.deletedCount>0){
              alert('Deleted Successfully');
              const remainingManagers= managers.filter(emp => emp._id !== id)
              setManagers(remainingManagers)
              }
              })
              }
              }
return (
<div className="container">
  <div className="row">
     <div className="col-lg-12">
        <div className="main-box clearfix">
           <div className="table-responsive">
              <table className="table user-list">
                 <thead>
                    <tr>
                       <th><span>Voucher Code </span></th>
                       <th><span>Voucher discount</span></th>                    
                    </tr>
                 </thead>
                 <tbody>
                 {
                    Object.keys(managers).length !== 0 &&
                    managers.map(manager =>
                    <tr key={manager.VouId}>
                       <td>
                          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/ticket_1f3ab.png" alt="" />
                          <a href="#" className="user-link">{manager.VouCode}</a>
                          {/* <span className="user-subhead">Manager</span> */}
                       </td>
                       <td>
                       {manager.VouDiscount}
                       </td>
                      
                    </tr>
                    )}
                 </tbody>
              </table>
              {/* <ManagerAdd></ManagerAdd> */}
           </div>
        </div>
     </div>
  </div>
</div>
);
};


export default ManageMyVoucher;