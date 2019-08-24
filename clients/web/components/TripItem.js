import ExpensesList from "./ExpensesList";
import React from "react";
import { Router } from "../routes";
import TripInfo from "./TripInfo";

const TripItem = ({ trip, expenses }) => {
  return (
    <>
      <TripInfo trip={trip} />
      <ExpensesList expenses={expenses} />
    </>
  );
};

export default TripItem;
