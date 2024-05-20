import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiContext } from '../../../SharedModule/components/ApiContext/ApiContext'
import { Button, Modal, Table } from 'react-bootstrap'
import noData from '../../../../assets/noData.jpg'
import deleteTrash from '../../../../assets/delete.png'
import { toast } from 'react-toastify'
import { ModeContext } from '../../../SharedModule/components/ModeContext/ModeContext'


export default function ProjectsList() {

  const { baseUrl, authorization } = useContext(ApiContext)
  
  const {  setMode  , setTitle  , setDescription } = useContext(ModeContext)
  
  const navigate = useNavigate()

  const [projectsList, setProjectsList] = useState([])

  const [projectId, setProjectId] = useState('')
  
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
   setProjectId(id);
   setShowDelete(true);   
  }
  
  const getProjects = async(title) => {
    try {
      let response = await axios.get(`${baseUrl}/Project/manager`,
        { headers: { Authorization: authorization } , params:{title} })
      setProjectsList(response.data.data)
   
    } catch (error) {
       toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
     
    }
  }

  const deleteProjectItem = async () => {
    try {
      let deletedItem = await axios.delete(
        `${baseUrl}/Project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.warning("Item Deleted Successfully", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      handleCloseDelete();
       getProjects()
    } catch (error:any) {
      
         toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleUpdate = (id,title,description) => {
    setMode('update')
    setTitle(title)
    setDescription(description)
    navigate(`/dashboard/projects-data/${id}`)
  }

  const getNameValue = (e) => {
    getProjects(e.target.value)
  }

  useEffect(() => {
  getProjects('')
  }, [])

  return (
<>
        <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="my-2 px-5 ">
      <div className="text-center">
      <img className="w-25" src={deleteTrash} alt="" />
      <h4 className="py-3">Delete This Project ?</h4>
      <p className="text-muted">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
      </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteProjectItem}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>

    <div className='projectsList vh-100'>
      <div className="projects-container bg-white px-3 d-flex justify-content-between py-4">
        <h3>Projects</h3>
        <Link onClick={setMode('create')} className='px-4 rounded-5' to={'/dashboard/projects-data'}> <i className='fa fa-plus pe-3'></i> Add New Project</Link>
      </div>
        <div className="projects-crud m-3  bg-white py-4 rounded-2">
              <div className="projects-filteration px-3 ">
          <input type="search" onChange={getNameValue} className='form-control w-25 rounded-5' placeholder='Search By Title' />
        </div>
        {projectsList.length ? (
          <>
        <div className="my-3">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr >
                <th>ID</th>
                <th>Title</th>
                <th>description</th>
                <th>Tasks</th>
                <th>Creation Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((ele) => 
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.title}</td>
                  <td>{ele.description}</td>
                  <td>{ele.tasks && ele.tasks[0]?.length}</td>
                  <td>{ formatDate(ele.creationDate) }</td>
                  <td>
                    <i
                      onClick={() => handleUpdate(ele.id,ele.title,ele.description)}
                      className="fa fa-edit mx-2 text-warning"
                    ></i>
                    <i
                      onClick={() => handleShowDelete(ele.id)}
                      className="fa fa-trash text-danger"
                    ></i>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
            </div>
            </>
      ) : (
        <div className="text-center w-50 mx-auto">
          <img src={noData} alt="" />
          <h4 className="my-3">No Data !</h4>
          <p className=" text-muted px-5 ">
            are you sure you want to add new items ? if you are sure just click
            on add new Project .
          </p>
        </div>
      )}
      </div>
      </div>
      </>
  );
}

