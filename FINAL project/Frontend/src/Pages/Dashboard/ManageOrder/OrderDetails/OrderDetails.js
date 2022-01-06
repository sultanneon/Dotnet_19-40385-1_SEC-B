import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const OrderDetails = (props) => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [managerDetails, setManagerDetails] = useState([]);
    const showDetails = (id) => {
        console.log(id);
        setIsOpenDetails(true);
        fetch(`https://localhost:44344/api/Order/get/${id}`)
        .then(res=>res.json())
        .then(res => setManagerDetails(res))
        }; 
        const hideDetails = () => {
        setIsOpenDetails(false);
        };
    return (
        <>
                           <span className="fa-stack" onClick={()=>showDetails(props.EmpID)}>
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
                                                         <h4>{managerDetails.OrderStatus}</h4>
                                                         <p className="text-secondary mb-1">{managerDetails.OrderDate}</p>
                                                         <p className="text-muted font-size-sm">{managerDetails.OrderPayMethod}</p>
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
                                                         <h6 className="mb-0">Order ID</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {managerDetails.OId}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Customer ID</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {managerDetails.CId}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Order Total Cost</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {managerDetails.OrderTotalCost}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Deliveryman ID</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {managerDetails.EId}
                                                      </div>
                                                   </div>
                                                   <hr />
                                                   <div className="row">
                                                      <div className="col-sm-3">
                                                         <h6 className="mb-0">Order Status</h6>
                                                      </div>
                                                      <div className="col-sm-9 text-secondary">
                                                         {managerDetails.OrderStatus}
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
    );
};


export default OrderDetails;