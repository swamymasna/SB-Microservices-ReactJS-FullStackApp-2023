import "bootstrap/dist/css/bootstrap.min.css";
import ListOrganizationComponent from "./components/ListOrganizationComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import CreateOrganizationComponent from "./components/CreateOrganizationComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import CreateDepartmentComponent from "./components/CreateDepartmentComponent";
import ViewOrganizationComponent from "./components/ViewOrganizationComponent";
import ViewDepartmentComponent from "./components/ViewDepartmentComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />}></Route>
            <Route path="/employees" element={<ListEmployeeComponent />}></Route>
            <Route path="/add-employee" element={<CreateEmployeeComponent />}></Route>
            <Route path="/edit-employee/:id" element={<CreateEmployeeComponent />}></Route>
            <Route path="/view-employee/:id" element={<ViewEmployeeComponent />}></Route>

            <Route path="/organizations" element={<ListOrganizationComponent />}></Route>
            <Route path="/add-organization" element={<CreateOrganizationComponent />}></Route>
            <Route path="/edit-organization/:id" element={<CreateOrganizationComponent />}></Route>
            <Route path="/view-organization/:id" element={<ViewOrganizationComponent />}></Route>
            
            <Route path="/departments" element={<ListDepartmentComponent />}></Route>
            <Route path="/add-department" element={<CreateDepartmentComponent />}></Route>      
            <Route path="/edit-department/:id" element={<CreateDepartmentComponent />}></Route>      
            <Route path="/view-department/:id" element={<ViewDepartmentComponent />}></Route>            
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
