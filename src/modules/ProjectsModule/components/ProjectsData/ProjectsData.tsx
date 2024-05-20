import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from '../../../SharedModule/components/ApiContext/ApiContext'
import { toast } from 'react-toastify'
import { ModeContext } from '../../../SharedModule/components/ModeContext/ModeContext'


export default function ProjectsData(){

  const { register , handleSubmit, formState: { errors, isDirty, isValid } , setValue } = useForm()

  const { baseUrl, authorization } = useContext(ApiContext)

  const {  mode,  title, description } = useContext(ModeContext)
  
 
  
  const { id } = useParams() 
  
 
  
  const navigate = useNavigate()

  const onSubmit = async(data) => {
    try {
      let response = await axios.post(`${baseUrl}/Project`, data, { headers: { Authorization: authorization } })
        toast.success("Project Added Successfully", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate('/dashboard/projects')
    } catch (error:any) {
  
        toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }

  const updateProject = async(data) => {
    try {
      let response = await axios.put(`${baseUrl}/Project/${id}`, data, { headers: { Authorization: authorization } })
       
        toast.success("Project Updated Successfully", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate('/dashboard/projects')
    } catch (error:any) {
       
        toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }

  const setValues = () => {
    if (mode==='update') {
      setValue('title', title)
      setValue('description' , description)
    }
  }

  useEffect(() => {
  setValues()
  }, [])
  
  return (
    <>
    <div className='projectsData vh-100'>
      <div className="projectsdata-container container  py-4  ">
        <Link className='text-black text-muted' to={'/dashboard/projects'}> <i className='fa fa-arrow-left pe-3'></i> View All Projects</Link>
        <h3 className='my-2 text-muted'> {mode==='create' ? 'Add a New Project' : 'Update Project'} </h3>
      </div>
      <div className="project-form w-75 shadow-sm rounded-4 bg-white mx-auto p-4">
        <form className='mt-4' onSubmit={ mode==='create' ? handleSubmit(onSubmit) : handleSubmit(updateProject)}>
          <div className="input-group my-3  ">
            <label className='text-black'>Title</label>
            <input type="text" className='w-100 p-2 border border-1 rounded-3 my-2 text-black' placeholder='Name'
              {...register('title', { required: 'Name Is Required' })} />
          </div>
          {errors.title && (<p className='alert alert-danger'>{errors.title.message}</p>)}
          <div className="input-group my-5 ">
            <label className='text-black'>Description</label>
            <textarea  className='w-100 p-2 border border-1 rounded-3 my-2 text-black' placeholder='Description'
              {...register('description', { required: 'Description Is required' })} />
          </div>
          {errors.description && (<p className='alert alert-danger'>{errors.description.message}</p>)}
          <div className="login-buttons d-flex  justify-content-between align-items-center my-2 ">
            <button
                className='rounded-5 py-2 px-4 border border-1 border-black'
                onClick={()=>navigate('/dashboard/projects')}
            >Cancel</button>
            <button
              disabled={!isDirty || !isValid}
              className={` ${!isDirty || !isValid ? 'disabled form-button py-2 px-4 rounded-5 text-white opacity-50' : 'form-button py-2 px-4 rounded-5  text-white'}`}>{mode === "create" ? "Save" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>  
    </>
  )
}
