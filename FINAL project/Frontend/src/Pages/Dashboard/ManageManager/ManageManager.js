import React, { useEffect, useState } from 'react';
import ManagerAdd from './ManagerAdd/ManagerAdd';
import ManagerDetails from './ManagerDetails/ManagerDetails';
import './ManagerManager.css';
import ManagerUpdate from './ManagerUpdate/ManagerUpdate';
const ManageManager = () => {
     const [managers, setManagers] = useState([]);
     useEffect(() => {
          fetch('https://localhost:44352/api/Manager/All')
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
                        <th><span>User</span></th>
                        <th><span>Created</span></th>
                        <th className="text-center"><span>Status</span></th>
                        <th><span>Email</span></th>
                        <th>&nbsp;</th>
                     </tr>
                  </thead>
                  <tbody>
                  {
                     Object.keys(managers).length !== 0 &&
                     managers.map(manager =>
                     <tr key={manager.MId}>
                        <td>
                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                           <a href="#" className="user-link">{manager.MName}</a>
                           <span className="user-subhead">Manager</span>
                        </td>
                        <td>
                           2013/08/08
                        </td>
                        <td className="text-center">
                           <span className="label label-default">Inactive</span>
                        </td>
                        <td>
                           <a href="#">{manager.MName}</a>
                        </td>
                        <td style={{ width: '20%' }}>
                        <div className="table-link d-flex">
                             {/* View Details  */}
                              <ManagerDetails EmpID={manager.MId}></ManagerDetails>
                              <ManagerUpdate EmpID={manager.MId}></ManagerUpdate>
                              {/* Delete Manager  */}
                              <span className="fa-stack" onClick= {()=> handleDelete(manager.MId)}>
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                           </span>
                         </div>
                             </td>
                             </tr>
                     )}
                  </tbody>
               </table>
               <ManagerAdd></ManagerAdd>
            </div>
         </div>
      </div>
   </div>
</div>
);
};
export default ManageManager;