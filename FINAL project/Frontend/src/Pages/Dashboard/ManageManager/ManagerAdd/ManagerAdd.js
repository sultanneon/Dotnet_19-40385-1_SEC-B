import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ManagerAdd = () => {
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
    const url=`https://localhost:44352/api/Manager/add`;
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
                        <label htmlFor="MName" className="form-label mt-2">Manager Name</label>
                        <input className="form-control" id="MName" {...register("MName", { required: true })} placeholder="" />
                        {errors.MName && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="MPassword" className="form-label mt-2">Manager Password</label>
                        <input className="form-control" id="MPassword" {...register("MPassword", { required: true })} placeholder="" />
                        {errors.MPassword && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="MEmail" className="form-label mt-2">Manager Email</label>
                        <input className="form-control" id="MEmail" {...register("MEmail", { required: true })} placeholder="" />
                        {errors.MEmail && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="MAddress" className="form-label mt-2">Manager Address</label>
                        <input className="form-control" id="MAddress" {...register("MAddress", { required: true })} placeholder="" />
                        {errors.MAddress && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="MPhone" className="form-label mt-2">Employee Phone</label>
                        <input className="form-control" id="MPhone" {...register("MPhone", { required: true })} placeholder="" />
                        {errors.MPhone && 
                        <p className="text-danger">This field is required</p>
                        }
                        <input className="form-control " id="MPicture" {...register("MPicture", { required: true })} placeholder="" defaultValue=""  />
                        <label htmlFor="MBasicSalary" className="form-label mt-2">Manager BasicSalary</label>
                        <input className="form-control" id="MBasicSalary" {...register("MBasicSalary", { required: true })} placeholder="" />
                        {errors.MBasicSalary && 
                        <p className="text-danger">This field is required</p>
                        }
                        <input className="form-control " id="MFastiveBonus" {...register("MFastiveBonus", { required: true })} placeholder="" Value="0"/>
                        <input className="form-control " id="MPerformBonus" {...register("MPerformBonus", { required: true })} placeholder="" Value="0"/> 
                        <label htmlFor="MSchedule" className="form-label mt-2">Manager Schedule</label>
                        <input className="form-control" id="MSchedule" {...register("MSchedule", { required: true })} placeholder="" />
                        {errors.MSchedule && 
                        <p className="text-danger">This field is required</p>
                        }
                        <p className="text-center mt-2">
                           <input className="btn btn-success my-2" type="submit" value="Add Employee"/>
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

export default ManagerAdd;