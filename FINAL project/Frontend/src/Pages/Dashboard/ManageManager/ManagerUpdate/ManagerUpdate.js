import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
const ManagerUpdate = (props) => {
const [isOpen, setIsOpen] = React.useState(false);
const [ID,SetID]=useState('');
const [employeeDetails, setemployeeDetails] = useState([]);
const { register, handleSubmit, formState: { errors } ,reset} = useForm();
const showModal = (Id) => {
setIsOpen(true);
console.log(Id);
SetID(Id);
fetch(`https://localhost:44352/api/Manager/get/${Id}`)
.then(res=>res.json())
.then(res => {
    setemployeeDetails(res);
    //reset();
})
};
const hideModal = () => {
setIsOpen(false);
//reset();
};
const onSubmitEdit = data => {
console.log(data);
const url=`https://localhost:44352/api/Manager/edit`;
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
//reset();
})
alert("Edited Successfully");
hideModal();
}
return (
<div>
   <>
   <span className="fa-stack" onClick={()=>showModal(props.EmpID)}>
   <i className="fa fa-square fa-stack-2x"></i>
   <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
   </span>
   <Modal show={isOpen} onHide={hideModal} size="lg">
      <Modal.Header>
         <Modal.Title>Edit Manager Information</Modal.Title>
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
                              <h4>{employeeDetails.MName}</h4>
                              <p className="text-secondary mb-1">Manager</p>
                              <p className="text-muted font-size-sm">{employeeDetails.MAddress}</p>
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
                           <label htmlFor="MId" className="form-label mt-2">Employee ID</label>
                           <input className="form-control" id="MId" {...register("MId", { required: true })} placeholder="" defaultValue={`${employeeDetails.MId}`}/>
                           {errors.MId && 
                           <p className="text-danger">This field is required</p>
                           }
                           <label htmlFor="MName" className="form-label mt-2">Manager Name</label>
                           <input className="form-control" id="MName" {...register("MName", { required: true })} placeholder="" defaultValue={`${employeeDetails.MName}`}/>
                           {errors.MName && 
                           <p className="text-danger">This field is required</p>
                           }
                           <label htmlFor="MEmail" className="form-label mt-2">Manager Email</label>
                           <input className="form-control" id="MEmail" {...register("MEmail", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MEmail}`}/>
                           {errors.MEmail && 
                           <p className="text-danger">This field is required</p>
                           }
                           <label htmlFor="MPassword" className="form-label mt-2">Manager Password</label>
                           <input className="form-control" id="MPassword" {...register("MPassword", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MPassword}`}/>
                           {errors.MPassword && 
                           <p className="text-danger">This field is required</p>
                           }
                           <label htmlFor="MAddress" className="form-label mt-2">Manager Address</label>
                           <input className="form-control" id="MAddress" {...register("MAddress", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MAddress}`}/>
                           {errors.MAddress && 
                           <p className="text-danger">This field is required</p>
                           }
                           <label htmlFor="MPhone" className="form-label mt-2">Manager Phone</label>
                           <input className="form-control" id="MPhone" {...register("MPhone", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MPhone}`}/>
                           {errors.MPhone && 
                           <p className="text-danger">This field is required</p>
                           }
                           <input className="form-control " id="MPicture" {...register("MPicture", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MPicture}`}/>
                           <label htmlFor="MBasicSalary" className="form-label mt-2">Manager BasicSalary</label>
                           <input className="form-control" id="MBasicSalary" {...register("MBasicSalary", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MBasicSalary}`}/>
                           {errors.MBasicSalary && 
                           <p className="text-danger">This field is required</p>
                           }
                           <input className="form-control " id="MFastiveBonus" {...register("MFastiveBonus", { required: true })} placeholder="" defaultValue="0"  defaultValue={`${employeeDetails.MFastiveBonus}`}/>
                           <input className="form-control " id="MPerformBonus" {...register("MPerformBonus", { required: true })} placeholder="" defaultValue="0"  defaultValue={`${employeeDetails.MPerformBonus}`}/> 

                           

                           <p className="text-center mt-2">
                              <input className="btn btn-success my-2" type="submit" defaultValue="Edit Manager"/>
                           </p>
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
</div>
);
};
export default ManagerUpdate;