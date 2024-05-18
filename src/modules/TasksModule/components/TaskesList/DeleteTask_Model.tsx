import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/noData.png";
import { baseUrl } from "../../../../Context/baseUrl";
import axios from "axios";
const DeleteTask_Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState("close");
  // ********to close modal*******************
  const handleClose = () => setModalState("close");

  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);


  // ************to deleted from Tasks*********
  const deleteTask = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`${baseUrl}/Task/${taskId}`);
      setTasks(response.data.data);
      setTaskId(taskId);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      // ************Modal to deleted from Tasks*********
      <Modal show={modalState === "delete-modal"} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>delete this Task?</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} />
            <p>
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
          <div className="text-end ">
            <button
              onClick={deleteTask}
              className={
                "btn btn-outline-danger my-3" + (isLoading ? " disabled" : "")
              }
            >
              {isLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Delete this item"
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteTask_Model;
