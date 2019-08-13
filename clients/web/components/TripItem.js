import ExpensesList from "./ExpensesList";
import FAB from "./elements/FAB";
import React from "react";
import { Router } from "../routes";
import TripInfo from "./TripInfo";

const TripItem = ({ trip, expenses }) => {
  return (
    <>
      <TripInfo trip={trip} />
      <ExpensesList expenses={expenses} />
      <FAB
        onClick={() => Router.pushRoute("addExpense", { id: trip.id })}
        position={{ bottom: 30, right: 30 }}
        tooltipContent="Add Expense"
      >
        <p className="text-center w-full text-2xl text-white">＋</p>
      </FAB>
    </>
  );
};

export default TripItem;
