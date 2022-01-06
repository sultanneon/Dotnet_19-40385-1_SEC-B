import React, { useEffect, useState } from 'react';

// import ProductDetails from './ProductDetails/ProductDetails';
import './OrderDetails.css';

const OrderDetails = () => {
    const [managers, setManagers] = useState([]);
    useEffect(() => {
         fetch('https://localhost:44344/api/Order/orderdetails')
         .then(res => res.json())
         .then(result => setManagers(result))
         }, [managers])
         const handleDelete=(id)=>{
              console.log(id);
              const proceed=window.confirm(`Are you sure, To delete ,id is ${id}`);
              if(proceed){
              fetch(`https://localhost:44344/api/Manager/delete/${id}`,{
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
                       <th><span>Orderdetails ID</span></th>
                       <th><span>Product ID</span></th>
                       <th className="text-center"><span>Order ID</span></th>
                       <th><span>Product Quantity</span></th>
                       {/* <th>&nbsp;</th> */}
                    </tr>
                 </thead>
                 <tbody>
                 {
                    Object.keys(managers).length !== 0 &&
                    managers.map(manager =>
                    <tr key={manager.CId}>
                       <td>
                          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/softbank/145/package_1f4e6.png" alt="" />
                          <a href="#" className="user-link">{manager.OrderDetailsId}</a>
                          {/* <span className="user-subhead">Manager</span> */}
                       </td>
                       <td>
                       {manager.PId}
                       </td>
                       <td className="text-center">
                          <span className="label label-default">{manager.OId}</span>
                       </td>
                       <td>
                          <a href="#">{manager.PQuantity}</a>
                       </td>
                       {/* <td style={{ width: '20%' }}>
                       <div className="table-link d-flex"> */}
                            {/* View Details  */}
                             {/* <ProductDetails EmpID={manager.PId}></ProductDetails> */}
                             {/* <ManagerUpdate EmpID={manager.MId}></ManagerUpdate> */}
                             {/* Delete Manager  */}
                             {/* <span className="fa-stack" onClick= {()=> handleDelete(manager.MId)}>
                             <i className="fa fa-square fa-stack-2x"></i>
                             <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span> */}
                        {/* </div> */}
                            {/* </td> */}
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


export default OrderDetails;