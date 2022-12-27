import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router";
import './admindashboard.css'
import { AuthContext } from "../authContext";
import MkdSDK from "../utils/MkdSDK";
import {UserOutlined} from '@ant-design/icons'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

let sdk = new MkdSDK();



const AdminDashboardPage = () => {

  const [pageData, setPageData] = useState([])
  const [payload, setpayload]= useState({
    "payload": {},
    "page": 1,
    "limit": 10
})
  const prev = async ()=>{
    setpayload(existingValues => ({
      // Retain the existing values
      ...existingValues,
      // update the firstName
      page: payload.page-1,
    }))
      const page = await sdk.callRestAPI(payload, "PAGINATE")
      setPageData(page)

  }
  const next= async()=>{
    setpayload(existingValues => ({
      // Retain the existing values
      ...existingValues,
      // update the firstName
      page: payload.page+1,
    }))
    const page = await sdk.callRestAPI(payload, "PAGINATE")
    setPageData(page)
  }

  
  const navigate = useNavigate()
  const { dispatch } = React.useContext(AuthContext);
  const handleLogout =()=>{
    dispatch({
      type:'LOGOUT'
    })
    navigate('/admin/login')
  }

  useEffect(()=>{
    const getData = async()=>{
    const page = await sdk.callRestAPI(payload, "PAGINATE")
    setPageData(page)
    console.log("page", page)
    }
    getData()
  },[payload.page])
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between px-10 py-10">
           <h1 className="text-xl font-bold text-cyan-50 p-2">APP</h1>
           <button type="button" className="logout__button" onClick={handleLogout}>
                <UserOutlined />
                Logout
           </button>
        </div>
        <div className="dashboard px-10">
            <div className="dashboard__header">
                 <h4> Today's Letterhead</h4>
                 <div className="dashboard__header-span">
                  <div className="dashbaord__header-span_inner">
                    <p> {new Date().toLocaleDateString()}</p>
                    <p className="submission"> Submission Open</p>
                    <p> {new Date().toLocaleTimeString()}</p>
                  </div>
                 </div>
            </div>
            <div className="dashboard__table">
              <div className="dashboard__table-header">
                  <span>#</span>
                  <span className="title">title</span>
                  <span>Author</span>
                  <span>Most Liked</span>
              </div>

              {
                pageData?.list?.map((item)=>{
                  return(
                    <DndProvider backend={HTML5Backend}>
                    <div className="dashboard__table-row">
                        <span>{item.id}</span>
                        <span><img src={item.photo}/></span>
                        <span className="dashobard__table-title">{item.title}</span>
                        <span>{item.username}</span>
                        <span>{item.like}</span>
                    </div>
                    </DndProvider>
                  )
                })
              }
            <div>
                <p style={{color:'white'}}>Page {payload?.page} of {pageData?.num_pages}</p>
            </div>
            <div className="dashbaord__button">
                <button onClick={prev} disabled={payload?.page===1}>Previous</button>
                <button onClick={next} disabled={payload?.page===12}>Next</button>
            </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
