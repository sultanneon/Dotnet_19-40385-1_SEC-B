import React, { useEffect, useState } from 'react';
import CartAdd from './CartAdd/CartAdd';
import './ManageCart.css';
import CartUpdate from './CartUpdate/CartUpdate';

const ManageCart = () => {
    const [managers, setManagers] = useState([]);
     useEffect(() => {
          fetch('https://localhost:44344/api/Cart/All')
          .then(res => res.json())
          .then(result => setManagers(result))
          }, [managers])
          const handleDelete=(id)=>{
               console.log(id);
               const proceed=window.confirm(`Are you sure, To delete ,id is ${id}`);
               if(proceed){
               fetch(`https://localhost:44344/api/Cart/delete/${id}`,{
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
                       <th><span>Cart ID</span></th>
                       <th><span>Product ID</span></th>
                       <th className="text-center"><span>Product Quantity</span></th>
                      
                       <th>&nbsp;</th>
                    </tr>
                 </thead>
                 <tbody>
                 {
                    Object.keys(managers).length !== 0 &&
                    managers.map(manager =>
                    <tr key={manager.CartId}>
                       <td>
                          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/shopping-cart_1f6d2.png" alt="" />
                          <a href="#" className="user-link">{manager.CartId}</a>
                          <span className="user-subhead"></span>
                       </td>
                       <td>
                       {manager.PId}
                       </td>
                       <td className="text-center">
                          <span className="label label-default">{manager.PQuantity}</span>
                       </td>
                      
                       <td style={{ width: '20%' }}>
                       <div className="table-link d-flex">
                            {/* View Details  */}
                             {/* <ManagerDetails EmpID={manager.MId}></ManagerDetails> */}
                             <CartUpdate EmpID={manager.CartId}></CartUpdate>
                             {/* Delete Manager  */}
                             <span className="fa-stack" onClick= {()=> handleDelete(manager.CartId)}>
                             <i className="fa fa-square fa-stack-2x"></i>
                             <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                        </div>
                            </td>
                            </tr>
                    )}
                 </tbody>
              </table>
              <CartAdd></CartAdd>
           </div>
        </div>
     </div>
  </div>
</div>
);
};

export default ManageCart;