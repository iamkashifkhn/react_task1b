import React from "react";
import { useNavigate } from "react-router";
import './admindashboard.css'
import { AuthContext } from "../authContext";


const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const { dispatch } = React.useContext(AuthContext);
  const handleLogout =()=>{
    dispatch({
      type:'LOGOUT'
    })
    navigate('/admin/login')
  }

  return (
    <>
      <div className="bg-slate-800 h-screen">
        <div className="flex justify-between px-10 py-10">
           <h1 className="text-xl font-bold text-cyan-50 p-2">APP</h1>
           <button type="button" className="p-2 bg-lime-400 rounded-xl" onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard px-10">
            <div className="dashboard__header">
                 <h4> Today's Letterhead</h4>
                 <div className="dashboard__header-span">
                    <p> 26 dec 2022</p>
                    <p> Submission Open</p>
                    <p> 11: 34 AM</p>
                 </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
