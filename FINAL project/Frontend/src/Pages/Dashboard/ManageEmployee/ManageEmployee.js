import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './ManageEmployee.css';
const ManageEmployee = () => {
const [employees, setEmployees] = useState([]);
const { register, handleSubmit, formState: { errors } ,reset} = useForm();
// Show Details 
const [isOpenDetails, setIsOpenDetails] = React.useState(false);
const [employeeDetails, setemployeeDetails] = useState([]);
// const [Id,setIDforDetails]=useState('');
const showDetails = (id) => {
setIsOpenDetails(true);
fetch(`https://localhost:44344/api/employee/get/${id}`)
.then(res=>res.json())
.then(res => setemployeeDetails(res))
}; 
const hideDetails = () => {
setIsOpenDetails(false);
};
useEffect(() => {
fetch('https://localhost:44344/api/Employee/All')
.then(res => res.json())
.then(result => setEmployees(result))
}, [employees])
//Edit View
const [isOpen, setIsOpen] = React.useState(false);
const [ID,SetID]=useState('');
const showModal = (Id) => {
setIsOpen(true);
SetID(Id);
fetch(`https://localhost:44344/api/employee/get/${Id}`)
.then(res=>res.json())
.then(res => {
setemployeeDetails(res);
reset();
})
};
const hideModal = () => {
reset();
setIsOpen(false);
reset();
};
const handleDelete=(id)=>{
const proceed=window.confirm(`Are you sure, To delete ,id is ${id}`);
if(proceed){
fetch(`https://localhost:44344/api/Employee/delete/${id}`,{
method: 'POST'
})
.then(res => res.json())
.then(data=>{
if(data.deletedCount>0){
alert('Deleted Successfully');
const remainingEmployees= employees.filter(emp => emp._id !== id)
setEmployees(remainingEmployees)
}
})
}
}
const onSubmitEdit = data => {
console.log(data);
const url=`https://localhost:44344/api/Employee/edit`;
fetch(url, {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(res => res.json())
.then(data => {
alert(data);
reset();
})
// axios.post('https://localhost:44344/api/Employee/edit',data)
// .then(res => {
//     console.log(res);
//     if(res.data.insertedId){
//         alert("New Plan Added Successfully");
//         reset();
//     }
// })
}
//  Add Employee 
const [isOpenAddEmp, setIsOpenAddEmp] = React.useState(false);
const showAddEmpModal = () => {
reset();
setIsOpenAddEmp(true);
};
const hideAddEmpModal = () => {
setIsOpenAddEmp(false);
};
const onSubmit = data =>{
// console.log(data);
console.log(JSON.stringify(data));
// axios.post(`https://localhost:44344/api/Employee/add`,data)
// .then((res)=>{
//      console.log(res.data);
// })
const url=`https://localhost:44344/api/Employee/add`;
fetch(url, {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(res => res.json())
.then(data => {
alert(data);
})
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
                     Object.keys(employees).length !== 0 &&
                     employees.map(employee =>
                     <tr key={employee.EId}>
                        <td>
                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                           <a href="#" className="user-link">{employee.EName}</a>
                           <span className="user-subhead">Employee</span>
                        </td>
                        <td>
                           2013/08/08
                        </td>
                        <td className="text-center">
                           <span className="label label-default">Inactive</span>
                        </td>
                        <td>
                           <a href="#">{employee.EName}</a>
                        </td>
                        <td style={{ width: '20%' }}>
                        <div className="table-link">
                           <>
                           <span className="fa-stack" onClick={()=>showDetails(employee.EId)}>
                           <i className="fa fa-square fa-stack-2x"></i>
                           <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                           </span>
                           <Modal show={isOpenDetails} onHide={hideDetails} size="lg" className="mt-2">
                              <Modal.Header>
                                 <Modal.Title>View Information</Modal.Title>
                                 <button onClick={hideDetails} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </Modal.Header>
                              <Modal.Body>
                                 {/* Start */}
                                 <div className="container">
                                    <div className="main-body">
                                       <div className="row gutters-sm">
                                          <div className="col-md-6 mb-3">
                                             <div className="card">
                                                <div className="card-body">
                                                   <div className="d-flex flex-column align-items-center text-center">
                                                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                                      <div className="mt-3">
                                                         <h4>{employeeDetails.EName}</h4>
                                                         <p className="text-secondary mb-1">Employee</p>
                                                         <p className="text-muted font-size-sm">{employeeDetails.EAddress}</p>
                                                         <button className="btn btn-outline-primary">Message</button>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="card mb-3">
                                                <div className="card-body">
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Full Name</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {employeeDetails.EName}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Email</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {employeeDetails.EEmail}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Phone</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {employeeDetails.EPhone}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Mobile</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {employeeDetails.EPhone}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Address</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {employeeDetails.EAddress}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 {/* End  */}
                              </Modal.Body>
                              <Modal.Footer>
                                 <button onClick={hideDetails} type="button" class="btn btn-primary">OK</button>
                              </Modal.Footer>
                           </Modal>
                           </>
                           <>
                           <span className="fa-stack" onClick={()=>showModal(employee.EId)}>
                           <i className="fa fa-square fa-stack-2x"></i>
                           <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                           </span>
                           <Modal show={isOpen} onHide={hideModal} size="lg">
                              <Modal.Header>
                                 <Modal.Title>Edit Employee Information</Modal.Title>
                                 <button onClick={hideModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </Modal.Header>
                              <Modal.Body>
                                 <div className="main-body">
                                    <div className="row gutters-sm">
                                       <div className="col-md-4 mb-3">
                                          <div className="card">
                                             <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                   <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                                   <div className="mt-3">
                                                      <h4>{employeeDetails.EName}</h4>
                                                      <p className="text-secondary mb-1">Employee</p>
                                                      <p className="text-muted font-size-sm">{employeeDetails.EAddress}</p>
                                                      <button className="btn btn-outline-primary">Message</button>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-md-8">
                                          <div className="card mb-3">
                                             <div className="card-body">
                                                Form WIll be Added Here
                                                {Object.keys(employeeDetails).length !==0 && 
                                                <form onSubmit={handleSubmit(onSubmitEdit)}>
                                                   <label htmlFor="EId" className="form-label mt-2">Employee ID</label>
                                                   <input className="form-control" id="EId" {...register("EId", { required: true })} placeholder="" value={`${employeeDetails.EId}`}/>
                                                   {errors.EId && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="EName" className="form-label mt-2">Employee Name</label>
                                                   <input className="form-control" id="EName" {...register("EName", { required: true })} placeholder="" value={`${employeeDetails.EName}`}/>
                                                   {errors.EName && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="EEmail" className="form-label mt-2">Employee Email</label>
                                                   <input className="form-control" id="EEmail" {...register("EEmail", { required: true })} placeholder=""  value={`${employeeDetails.EEmail}`}/>
                                                   {errors.EEmail && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="EPassword" className="form-label mt-2">Employee Password</label>
                                                   <input className="form-control" id="EPassword" {...register("EPassword", { required: true })} placeholder=""  value={`${employeeDetails.EPassword}`}/>
                                                   {errors.EPassword && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="EAddress" className="form-label mt-2">Employee Address</label>
                                                   <input className="form-control" id="EAddress" {...register("EAddress", { required: true })} placeholder=""  value={`${employeeDetails.EAddress}`}/>
                                                   {errors.EAddress && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="EPhone" className="form-label mt-2">Employee Phone</label>
                                                   <input className="form-control" id="EPhone" {...register("EPhone", { required: true })} placeholder=""  value={`${employeeDetails.EPhone}`}/>
                                                   {errors.EPhone && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <input className="form-control " id="EPicture" {...register("EPicture", { required: true })} placeholder=""  value={`${employeeDetails.EPicture}`}/>
                                                   <label htmlFor="EBasicSalary" className="form-label mt-2">Employee BasicSalary</label>
                                                   <input className="form-control" id="EBasicSalary" {...register("EBasicSalary", { required: true })} placeholder=""  value={`${employeeDetails.EBasicSalary}`}/>
                                                   {errors.EBasicSalary && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <input className="form-control " id="EFastiveBonus" {...register("EFastiveBonus", { required: true })} placeholder="" Value="0"  value={`${employeeDetails.EFastiveBonus}`}/>
                                                   <input className="form-control " id="EPerformBonus" {...register("EPerformBonus", { required: true })} placeholder="" Value="0"  value={`${employeeDetails.EPerformBonus}`}/> 
                                                   <label htmlFor="ESchedule" className="form-label mt-2">Employee Schedule</label>
                                                   <input className="form-control" id="ESchedule" {...register("ESchedule", { required: true })} placeholder=""  value={`${employeeDetails.ESchedule}`}/>
                                                   {errors.ESchedule && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <p className="text-center mt-2">
                                                      <input className="btn btn-success my-2" type="submit" value="Edit Employee"/>
                                                   </p>
                                                   {/* <label htmlFor="name" className="form-label mt-2">Employee Name</label>
                                                   <input className="form-control" id="name" {...register("name", { required: true })} placeholder="" defaultValue={`${employeeDetails.EName}`}/>
                                                   {errors.name && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="email" className="form-label mt-2">Employee's Email</label>
                                                   <input className="form-control" id="email" {...register("email", { required: true })} placeholder="" defaultValue={`${employeeDetails.EEmail}`}/>
                                                   {errors.email && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="address" className="form-label mt-2">Employee's Address</label>
                                                   <input className="form-control" id="address" {...register("address", { required: true })} placeholder="" defaultValue={`${employeeDetails.EAddress}`}/>
                                                   {errors.address && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="phone" className="form-label mt-2">Employee's Phone</label>
                                                   <input className="form-control" id="phone" {...register("phone", { required: true })} placeholder="" defaultValue={`${employeeDetails.EPhone}`}/>
                                                   {errors.phone && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="bsalary" className="form-label mt-2">Employee's Basic Salary</label>
                                                   <input className="form-control" id="bsalary" {...register("bsalary", { required: true })} placeholder="" defaultValue={`${employeeDetails.EBasicSalary}`}/>
                                                   {errors.bsalary && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <label htmlFor="schedule" className="form-label mt-2">Given Schedule</label>
                                                   <input className="form-control" id="schedule" {...register("schedule", { required: true })} placeholder="" defaultValue={`${employeeDetails.ESchedule}`}/>
                                                   {errors.schedule && 
                                                   <p className="text-danger">This field is required</p>
                                                   }
                                                   <p className="text-center mt-2">
                                                      <input className="btn btn-success my-2" type="submit" value="Place Order"/>
                                                   </p>
                                                   */}
                                                </form>
                                                }
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </Modal.Body>
                           </Modal>
                           </>
                           <span className="fa-stack" onClick= {()=> handleDelete(employee.EId)}>
                           <i className="fa fa-square fa-stack-2x"></i>
                           <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                           </span>
                        </div>
                        </td>
                     </tr>
                     )
                     }
                  </tbody>
               </table>
               <div className="d-flex justify-content-center ">
                  <button className="btn btn-primary"  onClick={showAddEmpModal}>Add New Employee</button>
               </div>
               <>
               <Modal show={isOpenAddEmp} onHide={hideAddEmpModal} size="lg">
                  <Modal.Header>
                     <Modal.Title>Add New Employee</Modal.Title>
                     <button onClick={hideAddEmpModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </Modal.Header>
                  <Modal.Body>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="EName" className="form-label mt-2">Employee Name</label>
                        <input className="form-control" id="EName" {...register("EName", { required: true })} placeholder="" />
                        {errors.EName && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="EPassword" className="form-label mt-2">Employee Password</label>
                        <input className="form-control" id="EPassword" {...register("EPassword", { required: true })} placeholder="" />
                        {errors.EPassword && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="EEmail" className="form-label mt-2">Employee Email</label>
                        <input className="form-control" id="EEmail" {...register("EEmail", { required: true })} placeholder="" />
                        {errors.EEmail && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="EAddress" className="form-label mt-2">Employee Address</label>
                        <input className="form-control" id="EAddress" {...register("EAddress", { required: true })} placeholder="" />
                        {errors.EAddress && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="EPhone" className="form-label mt-2">Employee Phone</label>
                        <input className="form-control" id="EPhone" {...register("EPhone", { required: true })} placeholder="" />
                        {errors.EPhone && 
                        <p className="text-danger">This field is required</p>
                        }
                        <input className="form-control " id="EPicture" {...register("EPicture", { required: true })} placeholder="" defaultValue=""  />
                        <label htmlFor="EBasicSalary" className="form-label mt-2">Employee BasicSalary</label>
                        <input className="form-control" id="EBasicSalary" {...register("EBasicSalary", { required: true })} placeholder="" />
                        {errors.EBasicSalary && 
                        <p className="text-danger">This field is required</p>
                        }
                        <input className="form-control " id="EFastiveBonus" {...register("EFastiveBonus", { required: true })} placeholder="" Value="0"/>
                        <input className="form-control " id="EPerformBonus" {...register("EPerformBonus", { required: true })} placeholder="" Value="0"/> 
                        <label htmlFor="ESchedule" className="form-label mt-2">Employee Schedule</label>
                        <input className="form-control" id="ESchedule" {...register("ESchedule", { required: true })} placeholder="" />
                        {errors.ESchedule && 
                        <p className="text-danger">This field is required</p>
                        }
                        <p className="text-center mt-2">
                           <input className="btn btn-success my-2" type="submit" value="Add Employee"/>
                        </p>
                     </form>
                     {/* <label htmlFor="EName" className="form-label mt-2">Employee Name</label>
                     <input className="form-control" id="EName" {...register("EName", { required: true })} placeholder="" />
                     {errors.EName && 
                     <p className="text-danger">This field is required</p>
                     }
                     <label htmlFor="EPassword" className="form-label mt-2">One Time Password</label>
                     <input className="form-control" id="EPassword" {...register("EPassword", { required: true })} placeholder="" />
                     {errors.EPassword && 
                     <p className="text-danger">This field is required</p>
                     }
                     <label htmlFor="EAddress" className="form-label mt-2">Employee Address</label>
                     <input className="form-control" id="EAddress" {...register("EAddress", { required: true })} placeholder="" />
                     {errors.EAddress && 
                     <p className="text-danger">This field is required</p>
                     }
                     <label htmlFor="EPhone" className="form-label mt-2">Employee Contact Number</label>
                     <input className="form-control" id="EPhone" {...register("EPhone", { required: true })} placeholder="" />
                     {errors.EPhone && 
                     <p className="text-danger">This field is required</p>
                     }
                     <input className="form-control" id="EPicture" {...register("EPicture", { required: true })} placeholder="" defaultValue="" type="hidden"/>
                     <label htmlFor="EBasicSalary" className="form-label mt-2">Employee's Basic Salary</label>
                     <input className="form-control" id="EBasicSalary" {...register("EBasicSalary", { required: true })} placeholder="" />
                     {errors.EBasicSalary && 
                     <p className="text-danger">This field is required</p>
                     }
                     <input className="form-control" id="EFastiveBonus" {...register("EFastiveBonus", { required: true })} placeholder="" defaultValue="0" type="hidden"/>
                     <input className="form-control" id="EPerformBonus" {...register("EPerformBonus", { required: true })} placeholder="" defaultValue="0" type="hidden"/>
                     <label htmlFor="ESchedule" className="form-label mt-2">Starting Schedule</label>
                     <input className="form-control" id="ESchedule" {...register("ESchedule", { required: true })} placeholder="" /> */}
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
               </>
            </div>
         </div>
      </div>
   </div>
</div>
);
};
export default ManageEmployee;