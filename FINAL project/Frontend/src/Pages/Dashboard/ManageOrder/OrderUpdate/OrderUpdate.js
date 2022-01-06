import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const OrderUpdate = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [ID,SetID]=useState('');
    const [employeeDetails, setemployeeDetails] = useState([]);
    const { register, handleSubmit, formState: { errors } ,reset} = useForm();
    const showModal = (Id) => {
    setIsOpen(true);
    console.log(Id);
    SetID(Id);
    fetch(`https://localhost:44344/api/Order/get/${Id}`)
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
    const url=`https://localhost:44344/api/Order/edit`;
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
                                  <h4>{employeeDetails.OrderDate}</h4>
                                  <p className="text-secondary mb-1">Order ID:{employeeDetails.OId}</p>
                                  <p className="text-muted font-size-sm">{employeeDetails.OrderPayMethod}</p>
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
                               <label htmlFor="OId" className="form-label mt-2" hidden>Employee ID</label>
                               <input className="form-control" id="OId"  type="hidden"    {...register("OId", { required: true })} placeholder="" defaultValue={`${employeeDetails.OId}`}/>
                               {errors.OId && 
                               <p className="text-danger">This field is required</p>
                               }
                               <label htmlFor="OrderStatus" className="form-label mt-2">Order Status</label>
                               <input className="form-control" id="OrderStatus" {...register("OrderStatus", { required: true })} placeholder="" defaultValue={`${employeeDetails.OrderStatus}`}/>
                               {errors.OrderStatus && 
                               <p className="text-danger">This field is required</p>
                               }
                               <label htmlFor="OrderDate" className="form-label mt-2" hidden>Manager Email</label>
                               <input className="form-control" id="OrderDate" type="hidden" {...register("OrderDate", { required: true })} placeholder=""  defaultValue={`${employeeDetails.OrderDate}`}/>
                               {errors.OrderDate && 
                               <p className="text-danger">This field is required</p>
                               }
                               
                               <label htmlFor="OrderPayMethod" className="form-label mt-2" hidden>Manager Address</label>
                               <input className="form-control" id="OrderPayMethod" type="hidden" {...register("OrderPayMethod", { required: true })} placeholder=""  defaultValue={`${employeeDetails.OrderPayMethod}`}/>
                               {errors.OrderPayMethod && 
                               <p className="text-danger">This field is required</p>
                               }
                               <label htmlFor="EId" className="form-label mt-2" >Manager Phone</label>
                               <input className="form-control" id="EId" {...register("EId", { required: true })} placeholder=""  defaultValue={`${employeeDetails.EId}`}/>
                               {errors.EId && 
                               <p className="text-danger">This field is required</p>
                               }
                               {/* <input className="form-control " id="MPicture" {...register("MPicture", { required: true })} placeholder=""  defaultValue={`${employeeDetails.MPicture}`}/> */}
                               <label htmlFor="CId" className="form-label mt-2" hidden>Manager BasicSalary</label>
                               <input className="form-control" id="CId" type="hidden" {...register("CId", { required: true })} placeholder=""  defaultValue={`${employeeDetails.CId}`}/>
                               {errors.CId && 
                               <p className="text-danger">This field is required</p>
                               }
                               <input className="form-control " id="OrderTotalCost" type="hidden" {...register("OrderTotalCost", { required: true })} placeholder="" defaultValue="0"  defaultValue={`${employeeDetails.OrderTotalCost}`}/>
                               {/* <input className="form-control " id="MPerformBonus" {...register("MPerformBonus", { required: true })} placeholder="" defaultValue="0"  defaultValue={`${employeeDetails.MPerformBonus}`}/>  */}
    
                               
    
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

export default OrderUpdate;