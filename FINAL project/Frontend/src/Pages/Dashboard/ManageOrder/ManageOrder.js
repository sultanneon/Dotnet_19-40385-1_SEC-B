import React, { useEffect, useState } from 'react';
import OrderDetails from './OrderDetails/OrderDetails';
import './ManageOrder.css';
import OrderUpdate from './OrderUpdate/OrderUpdate';

const ManageOrder = () => {
    const [managers, setManagers] = useState([]);
     useEffect(() => {
          fetch('https://localhost:44344/api/Order/All')
          .then(res => res.json())
          .then(result => setManagers(result))
          }, [managers])
          const handleDelete=(id)=>{
               console.log(id);
               const proceed=window.confirm(`Are you sure, To delete ,id is ${id}`);
               if(proceed){
               fetch(`https://localhost:44344/api/Order/delete/${id}`,{
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
                        <th><span>Order Status</span></th>
                        <th><span>Order Date</span></th>
                        <th className="text-center"><span>OrderPayMethod</span></th>
                        <th><span>OId</span></th>
                        <th>&nbsp;</th>
                     </tr>
                  </thead>
                  <tbody>
                  {
                     Object.keys(managers).length !== 0 &&
                     managers.map(manager =>
                     <tr key={manager.OId}>
                        <td>
                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                           <a href="#" className="user-link">{manager.OrderStatus}</a>
                           <span className="user-subhead">Manager</span>
                        </td>
                        <td>
                        <a href="#">{manager.OrderDate}</a>
                        </td>
                        <td className="text-center">
                        <a href="#">{manager.OrderPayMethod}</a>
                        </td>
                        <td>
                           <a href="#">{manager.OId}</a>
                        </td>
                        <td style={{ width: '20%' }}>
                        <div className="table-link d-flex">
                             {/* View Details  */}
                              <OrderDetails EmpID={manager.OId}></OrderDetails>
                              <OrderUpdate EmpID={manager.OId}></OrderUpdate>
                              {/* Delete Manager  */}
                              <span className="fa-stack" onClick= {()=> handleDelete(manager.OId)}>
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                           </span>
                         </div>
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

export default ManageOrder;