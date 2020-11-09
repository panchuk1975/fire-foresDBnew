import React, { memo, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { PaymentsRend } from "../components/4_render_components/PaymentsRend";
import fire from "../config/Fire";
import { Loader } from "../components/6_common_help_comp/Loader";

const Liquids = memo(() => {
    let contentWidthNumber =
    7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
    3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
    7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
    6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
    0.1046586 * window.innerWidth +
    106.6952733;
  let liquidWidth = `${contentWidthNumber + 4}%`;
  let email = fire.auth.currentUser.email;

  email = email.split("@")[0];
  const {
    loading,
    dates,
    fetchDates,
    projects,
    fetchProjects,
    payments,
    fetchPayments,
    fetchClients,
  } = useContext(FirebaseContext);
  let owner = fire.auth.currentUser.uid;
  let ownerDates = dates.find((date) => date.owner === owner);
  let ownerAllPayments = payments.filter((pay) => pay.owner === owner);
  let ownerAllProjects = projects.filter((project) => project.owner === owner);
  let ownerInitialDates = {};
  if (!ownerDates) {
    ownerInitialDates = {
      dateStart: "1950.01.01",
      dateOfEnd: 36,
      dateFinish: "2080.01.01",
    };
  }
  // let ownerPayments = ownerAllPayments.filter(
  //   (pay) => pay.payDate >= ownerDates.dateStart
  // );
  // ownerPayments = ownerPayments.filter(
  //   (pay) => pay.routDate <= ownerDates.dateFinish
  // );
//   let listLiquids = CommonLiquidsCount(ownerRoutes, cars);
//  // console.log(ownerAllRoutes)
//   listLiquids = listLiquids.sort((a, b) => a.name - b.name);
  useEffect(() => {
    fetchDates();
    fetchProjects();
    fetchPayments();
    fetchClients();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <PaymentsRend
          //listLiquids={listLiquids}
          ownerDates={ownerDates}
          ownerInitialDates={ownerInitialDates}
          liquidWidth={liquidWidth}
          ownerAllPayments={ownerAllPayments}
          ownerAllProjects={ownerAllProjects}
        />
      )}
    </div>
  );
});

export default Liquids;
