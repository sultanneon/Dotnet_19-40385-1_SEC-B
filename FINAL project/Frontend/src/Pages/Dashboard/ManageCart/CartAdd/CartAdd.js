import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CartAdd = () => {
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
    const url=`https://localhost:44344/api/Cart/add`;
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
                  <button className="btn btn-primary"  onClick={showAddEmpModal}>Add To Cart</button>
               </div>
               <>
               <Modal show={isOpenAddEmp} onHide={hideAddEmpModal} size="lg">
                  <Modal.Header>
                     <Modal.Title>Add To Cart</Modal.Title>
                     <button onClick={hideAddEmpModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </Modal.Header>
                  <Modal.Body>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="CartId" className="form-label mt-2" hidden >Manager Name</label>
                        <input className="form-control" id="CartId" type="hidden" {...register("CartId", { required: true })} placeholder="" value="30"/>
                        {errors.CartId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="CId" className="form-label mt-2" hidden >Manager Password</label>
                        <input className="form-control" id="CId" type="hidden"{...register("CId", { required: true })} placeholder="" value="8"/>
                        {errors.CId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="PId" className="form-label mt-2">Product ID</label>
                        <input className="form-control" id="PId" {...register("PId", { required: true })} placeholder="" />
                        {errors.PId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="PQuantity" className="form-label mt-2">Product Quantity</label>
                        <input className="form-control" id="PQuantity" {...register("PQuantity", { required: true })} placeholder="" />
                        {errors.PQuantity && 
                        <p className="text-danger">This field is required</p>
                        }
                      
                        <p className="text-center mt-2">
                           <input className="btn btn-success my-2" type="submit" value="Add to cart"/>
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


export default CartAdd;