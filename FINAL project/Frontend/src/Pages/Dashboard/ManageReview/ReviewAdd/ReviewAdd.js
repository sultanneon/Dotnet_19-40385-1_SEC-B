import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ReviewAdd = () => {
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
    const url=`https://localhost:44344/api/Reviews/add`;
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
                  <button className="btn btn-primary"  onClick={showAddEmpModal}>Give review</button>
               </div>
               <>
               <Modal show={isOpenAddEmp} onHide={hideAddEmpModal} size="lg">
                  <Modal.Header>
                     <Modal.Title>Give review</Modal.Title>
                     <button onClick={hideAddEmpModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </Modal.Header>
                  <Modal.Body>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="PRId" className="form-label mt-2" hidden >Manager Name</label>
                        <input className="form-control" id="PRId" type="hidden" {...register("PRId", { required: true })} placeholder="" value="30"/>
                        {errors.PRId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="PId" className="form-label mt-2"  >Product ID</label>
                        <input className="form-control" id="PId" {...register("PId", { required: true })} placeholder="" />
                        {errors.PId && 
                        <p className="text-danger">This field is required</p>
                        }
                        <label htmlFor="PReviews" className="form-label mt-2">Product Reviews</label>
                        <input className="form-control" id="PReviews" {...register("PReviews", { required: true })} placeholder="" />
                        {errors.PReviews && 
                        <p className="text-danger">This field is required</p>
                        }
                       
                      
                        <p className="text-center mt-2">
                           <input className="btn btn-success my-2" type="submit" value="Add review"/>
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




export default ReviewAdd;