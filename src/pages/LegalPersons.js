import React, { useContext, useEffect, useState, memo } from "react";
import { PersonsComp } from "../components/2_conteiners/PersonsComp";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/6_common_help_comp/Loader";
import fire from "../config/Fire";

const LegalPersons = memo(({ windowWidth }) => {
  const [search, setSearch] = useState("");
  const [filterItem, setFilter] = useState("all");
  const clientType = "Юрідичний";
  let email = "";
  if (fire.auth.currentUser) {
    email = fire.auth.currentUser.email;
    email = email.split("@")[0];
  }
  const {
    clients,
    projects,
    payments,
    dates,
    userInfos,

    loading,
    fetchDates,
    fetchUsersInfo,
    fetchClients,

    openClient,
    clouseClient,
    removeClient,

    addProject,
    openProject,
    clouseProject,
    openCurrentProject,
    clouseCurrentProject,
    removeProject,
    fetchProjects,

    addPayment,
    openPayment,
    openNewPayment,
    clouseNewPayment,
    clousePayment,
    fetchPayments,
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchClients();
    fetchDates();
    fetchUsersInfo();
    fetchPayments();
    fetchProjects();
    // eslint-disable-next-line
  }, []);
  //---SEARCH FUNCTION-------------->
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };
  //---SORT FUNCTION------------------------->
  const sortBySearch = (clients, search, property) => {
    //--Sort by client property-------->
    let newClients = clients.filter((client) => {
      if (client[property].toLowerCase().indexOf(search.toLowerCase()) > -1) {
        return client;
      }
      return null;
    })
    return newClients;
  }
  //---FILTER FUNCTIONS---------------------------->
  const sortByFilter = (clients, filter) => {
    //--Sort by client property-------->
    switch (filter) {
      case 'all': return clients;
      case 'active': return clients.filter((client) => client.negotiationsResult === "Не узгоджено");
      case 'done': return clients.filter((client) => client.negotiationsResult === "Узгоджено");
      case 'inprocess': return clients.filter((client) => client.negotiationsResult === "В процесі");
      default: return clients;
    }
  }
  const onFilterChange = (name) => {
    setFilter(name);
  }
  //---USE SORT FUNCTION--------------------------->
  let companyNameClients = sortBySearch(clients, search, 'companyName');
  let secNameClients = sortBySearch(clients, search, 'secName');
  let firstNameClients = sortBySearch(clients, search, 'firstName');
  let thirdNameClients = sortBySearch(clients, search, 'thirdName');
  let phonNumberClients = sortBySearch(clients, search, 'phonNumber');
  let addPhonNumberClients = sortBySearch(clients, search, 'addPhonNumber');
  let dateOfNegotiationsClients = sortBySearch(clients, search, 'dateOfNegotiations');
  let dateOfSignContractClients = sortBySearch(clients, search, 'dateOfSignContract');
  let registrationDateClients = sortBySearch(clients, search, 'registrationDate');
  let adressClients = sortBySearch(clients, search, 'adress');
  let ipNumberClients = sortBySearch(clients, search, 'ipNumber');
  let passportNumberClients = sortBySearch(clients, search, 'passportNumber');
  let visibleClients = sortByFilter([
    ...companyNameClients,
    ...secNameClients,
    ...firstNameClients,
    ...thirdNameClients,
    ...phonNumberClients,
    ...addPhonNumberClients,
    ...dateOfNegotiationsClients,
    ...dateOfSignContractClients,
    ...registrationDateClients,
    ...ipNumberClients,
    ...passportNumberClients,
    ...adressClients,
  ], filterItem);
  //---BUTTONS ARRAY----------------------->
  let buttonsArray = [
    { name: 'all', label: 'Всі' },
    { name: 'active', label: 'Активовані' },
    { name: 'inprocess', label: 'В процесі' },
    { name: 'done', label: 'Домовлено' },
  ];
  const buttonsBlock = buttonsArray.map(({ name, label }) => {
    const isActive = filterItem === name;
    const buttonClass = isActive ? 'btn-info' : "btn-outline-secondary";
    return (
      <button
        key={name}
        type="radio"
        className={`btn caseOfBtn ${buttonClass}`}
        value={filterItem}
        name="filterItem"
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    )
  })
  return (
    <div >
      <div className="d-flex  flex-wrap justify-content-between searchConteiner">
        <div>
          <small>{email}</small>
        </div>
        <div className="d-flex  flex-wrap justify-content-between buttonsConteiner">
          {buttonsBlock}
        </div>
        <div >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              name="search"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
          <PersonsComp
            dates={dates}
            clients={visibleClients}
            projects={projects}
            payments={payments}
            userInfos={userInfos}
            openClient={openClient}
            clouseClient={clouseClient}
            removeClient={removeClient}
            addProject={addProject}
            openProject={openProject}
            openCurrentProject={openCurrentProject}
            clouseCurrentProject={clouseCurrentProject}
            clouseProject={clouseProject}
            removeProject={removeProject}
            addPayment={addPayment}
            openPayment={openPayment}
            clousePayment={clousePayment}
            openNewPayment={openNewPayment}
            clouseNewPayment={clouseNewPayment}
            clientType={clientType}
            windowWidth={windowWidth}
          />
        )}
    </div>
  );
});

export default LegalPersons;
