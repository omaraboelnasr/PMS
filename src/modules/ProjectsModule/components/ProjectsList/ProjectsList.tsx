import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../../SharedModule/components/ApiContext/ApiContext'
import { Table } from 'react-bootstrap'
import noData from '../../../../assets/noData.jpg'

export default function ProjectsList() {

  const {baseUrl , authorization} = useContext(ApiContext)

  const [projectsList, setProjectsList] = useState([])
  
  const getProjects = async() => {
    try {
      let response = await axios.get(`${baseUrl}/Project/manager`,
        { headers: { Authorization: authorization } })
      console.log(response.data.data);
      setProjectsList(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  getProjects()
  }, [])

  return (
    <>
      <div className="projects-container bg-danger container d-flex justify-content-between my-3">
        <h3>Projects</h3>
        <Link className='px-4 rounded-5' to={'/dashboard/projects-data'}> <i className='fa fa-plus pe-3'></i> Add New Project</Link>
      </div>
      {projectsList.length ? (
        <div className="projects-crud container my-3 ">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>description</th>
                <th>Tasks</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((ele) => 
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.title}</td>
                  <td>{ele.description}</td>
                  {/* <td>{ele.tasks[0]?.length}</td> */}
                  <td>{ele.tasks && ele.tasks[0]?.length}</td>
                  <td>{ele.creationDate}</td>
                  <td>
                    <i
                      // onClick={() => handleShowUpdate(ele.id, ele.name)}
                      className="fa fa-edit mx-2 text-warning"
                    ></i>
                    <i
                      // onClick={() => handleShowDelete(ele.id)}
                      className="fa fa-trash text-danger"
                    ></i>
                  </td>
                </tr>
              
              )}
            </tbody>
          </Table>
        </div>
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
    </>
  );
}

