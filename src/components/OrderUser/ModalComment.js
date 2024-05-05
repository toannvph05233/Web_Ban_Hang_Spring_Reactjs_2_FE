import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {saveComment} from "../../service/CommentService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

 export  default function CommentUser(idP) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [comment, setComment] = useState({});
     // console.log(idP.modalComment)
     const navi = useNavigate();

    const handleComment = (event) => {
         comment = {
            ...comment,
            content: event.target.value,
             account: {
                id: localStorage.getItem('account')
             },
             product: {
                id: idP.modalComment.id
             }

        }
        setComment(comment)
    };

    return (
        <>
            <button style={{ marginTop: "2px"}} type="button" className='delete-btn text-dark' onClick={handleShow}>
                &nbsp;   | &nbsp;    <i className="fa-sharp fa-regular fa-pen-to-square" style={{color: '#b61b1b'}}></i> &nbsp;Đánh giá
            </button>

            <Modal  style={{scale: "1.2", marginTop: "200px"}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá sản phẩm:  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label></Form.Label>
                            <Form.Control placeholder={"Nhập đánh giá của bạn!"} as="textarea" rows={5} style={{ height: "100px" , fontSize:"12px"}}  onChange={handleComment} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{fontSize:'12px'}} variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button style={{fontSize:'12px'}} type={"submit"} variant="danger" onClick={() => {
                        if (comment !=='') {
                        handleClose()
                        saveComment(comment).then(()=>{
                            toast.success("Thêm thành công!",{autoClose:700})
                            navi("/product/"+idP.modalComment.id)
                        })
                    } else {
                            toast.error("Vui lòng nhập đánh giá!",{autoClose:700})

                        }
                    }}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}





