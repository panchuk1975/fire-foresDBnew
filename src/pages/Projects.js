import React, { useContext, useEffect, memo } from "react";
import { AllProjects } from "../components/2_conteiners/AllProjects";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/6_common_help_comp/Loader";
import fire from "../config/Fire";

const Projects = memo(({ windowWidth }) => {
  const clientType = "Юрідичний";
  let email = fire.auth.currentUser.email;
  email = email.split("@")[0];
  const {
    clients,
    projects,
    payments,
    dates,
    userInfos,

    loading,
    fetchClients,
    fetchDates,
    fetchUsersInfo,

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
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <AllProjects
        dates={dates} 
        clients={clients}
        projects={projects}
        payments={ payments}
        userInfos={userInfos}
        removeProject={removeProject}
        clientType={clientType}
        windowWidth={windowWidth}
        openCurrentProject={openCurrentProject}
        clouseCurrentProject={clouseCurrentProject}
        fetchPayments={fetchPayments}
        addPayment={addPayment}
        openPayment={openPayment}
        clousePayment={clousePayment}
        openNewPayment={openNewPayment}
        clouseNewPayment={clouseNewPayment}
      />
      )}
    </div>
  );
});

export default Projects;
