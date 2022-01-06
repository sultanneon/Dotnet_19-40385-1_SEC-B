import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const OrderAdd = () => {
    const [isOpenAddEmp, setIsOpenAddEmp] = React.useState(false);
    const { register, handleSubmit, formState: { errors } ,reset} = useForm();
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
    // axios.post(`https://localhost:44352/api/Employee/add`,data)
    // .then((res)=>{
    //      console.log(res.data);
    // })
    const url=`https://localhost:44344/api/Order/add`;
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
    alert("Added");
    })
    alert("Added Done");
    hideAddEmpModal();
    }
    return (
        <div>
            <div className="d-flex justify-content-center ">
                  <button className="btn btn-primary"  onClick={showAddEmpModal}>Order</button>
               </div>
               <>
               <Modal show={isOpenAddEmp} onHide={hideAddEmpModal} size="lg">
                  <Modal.Header>
                     <Modal.Title>Order</Modal.Title>
                     <button onClick={hideAddEmpModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </Modal.Header>
                  <Modal.Body>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="OId" className="form-label mt-2"  hidden>Manager Name</label>
                        <input className="form-control" id="OId" type="hidden"{...register("OId", { required: true })} placeholder=""  value="0"/>
                        {errors.OId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="CId" className="form-label mt-2" hidden>Customer ID</label>
                        <input className="form-control" id="CId" type="hidden"{...register("CId", { required: true })} placeholder="" value="8"/>
                        {errors.CId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="OrderStatus" className="form-label mt-2"  hidden>Manager Email</label>
                        <input className="form-control" id="OrderStatus" type="hidden"  {...register("OrderStatus", { required: true })} placeholder="" value="Ordered"/>
                        {errors.OrderStatus && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="OrderDate" className="form-label mt-2"  hidden>Manager Address</label>
                        <input className="form-control" id="OrderDate" type="hidden"  {...register("OrderDate", { required: true })} placeholder="" value="2021-12-22"/>
                        {errors.OrderDate && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="OrderTotalCost" className="form-label mt-2"  hidden>Employee Phone</label>
                        <input className="form-control" id="OrderTotalCost" type="hidden"  {...register("OrderTotalCost", { required: true })} placeholder="" value="900"/>
                        {errors.OrderTotalCost && 
                        <p className="text-danger">This field is required</p>
                        }
                        {/* <input className="form-control " id="MPicture" {...register("MPicture", { required: true })} placeholder="" defaultValue=""  /> */}
                        <label htmlFor="OrderPayMethod" className="form-label mt-2"  hidden>Manager BasicSalary</label>
                        <input className="form-control" id="OrderPayMethod"  type="hidden" {...register("OrderPayMethod", { required: true })} placeholder="" value="Bkash" />
                        {errors.OrderPayMethod && 
                        <p className="text-danger">This field is required</p>
                        }
                       
                        <label htmlFor="EId" className="form-label mt-2"  hidden>Manager Schedule</label>
                        <input className="form-control" id="EId" type="hidden" {...register("EId", { required: true })} placeholder=""  value="NULL"/>
                        {errors.EId && 
                        <p className="text-danger">This field is required</p>
                        }

                        <p className="text-center mt-2">
                           <input className="btn btn-success my-2" type="submit" value="Checkout"/>
                        </p>
                     </form>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
               </>
        </div>
    );
};

export default OrderAdd;