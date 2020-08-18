import React from "react";
import HelperService from "../../helperService/helperService";
import AuthService from "../../authService/auth.service";
import Header from "../header/header";
import Pagination from "../../components/pagination/pagination";

export default function HomePage(props) {
    const [country, setCountry] = React.useState("");
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [branch, setBranch] = React.useState("");
    const [employeeList, setEmployeeList] = React.useState([]);
    const [selectedPage, setSelectedPage] = React.useState(1);
    const [itemPerPage] = React.useState(10);

    const { history } = props;

    React.useEffect(() => {
        const isAuthUser = AuthService.isAuthUser();
        if (isAuthUser !== true) {
            history.push({
                pathname: '/login'
            });
        }
    });

    const handleSearch_OnClick = (e) => {
        setEmployeeList([]);
        fetchEmployeeList(country, fName, lName, branch);
    }

    const handlePagination_OnChange = value => {
        setSelectedPage(value);
    }

    const fetchEmployeeList = async (country, fName, lName, branch) => {
        fetch(HelperService.getAPIURL() + '/main/search?fName=' + fName + '&lName=' + lName + '&branch=' + branch + '&country=' + country, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(resJson => {
                setEmployeeList(resJson);
                console.log(resJson);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Header />

            <div className="container">
                <div className="row">
                    <br></br>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label className="text-info">Search By</label>
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Branch" onChange={(e) => setBranch(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="button" value="Search" className="btn btn-info btn-md btn-block" onClick={(e) => handleSearch_OnClick()} />
                    </div>
                </div>
                <div className="row">
                    <br></br>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeList.map((employee, index) => {
                                    return (((itemPerPage * (selectedPage - 1)) <= index) && (index < (itemPerPage * selectedPage))) ?
                                        <tr key={index}>
                                            <th scope="row">{(index + 1)}</th>
                                            <td>{(employee.fullName).split(" ")[0]}</td>
                                            <td>{(employee.fullName).split(" ")[1]}</td>
                                            <td>{employee.branch}</td>
                                            <td>{employee.country}</td>
                                        </tr>
                                        : null
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {(employeeList.length > 0) ? (
                    <div className="row">
                        <Pagination itemsCount={employeeList.length} itemPerPage={itemPerPage} onPageChanged={(value) => handlePagination_OnChange(value)} />
                    </div>) : null
                }
                <div className="row">
                    <br></br>
                </div>
            </div>
        </div>
    );
}
