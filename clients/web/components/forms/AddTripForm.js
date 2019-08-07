import { Link, Router } from "../../routes";
import React, { useState } from "react";
import {
  TRIPS_QUERY,
  TRIP_EXPENSES_QUERY,
  TRIP_QUERY
} from "../../graphql/queries";
import { addDays, parse, subDays } from "date-fns";

import AddTripLoader from "../loaders/AddTripLoader";
import Button from "../elements/Button";
import { CREATE_TRIP_MUTATION } from "../../graphql/mutations";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./elements/DatePickerCustomInput";
import ErrorField from "./errors/ErrorField";
import ErrorMessage from "./errors/ErrorMessage";
import Label from "./elements/Label";
import Select from "react-select";
import { redirect } from "../../lib/utils";
import { useMutation } from "@apollo/react-hooks";

const AddTripForm = props => {
  const [trip, setTrip] = useState({
    title: "",
    budget: 0,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    baseCurrency: {
      value: null,
      label: null
    },
    countries: null
  });

  const handleChange = event => {
    setTrip({
      ...trip,
      [event.target.name]: event.target.value
    });
  };

  // TODO: Improve these functions
  const handleChangeStartDate = startDate => {
    setTrip({
      ...trip,
      startDate
    });
  };

  const handleChangeEndDate = endDate => {
    setTrip({
      ...trip,
      endDate
    });
  };

  const handleChangeCurrency = baseCurrency => {
    setTrip({
      ...trip,
      baseCurrency
    });
  };

  const handleChangeCountries = countries => {
    setTrip({
      ...trip,
      countries
    });
  };

  const [createTrip, { loading, error }] = useMutation(CREATE_TRIP_MUTATION, {
    variables: {
      input: {
        ...trip,
        baseCurrency: trip.baseCurrency.value,
        countries: trip.countries
          ? trip.countries.map(country => {
              return country.value;
            })
          : null
      }
    },
    refetchQueries: ({ data }) => {
      return [
        {
          query: TRIP_QUERY,
          variables: { id: data.createTrip.trip.id }
        },
        {
          query: TRIP_EXPENSES_QUERY,
          variables: { tripId: data.createTrip.trip.id }
        },
        {
          query: TRIPS_QUERY
        }
      ];
    }
  });

  let countries =
    typeof props.countries !== "undefined"
      ? props.countries
          .map(country => {
            return {
              value: country.id,
              label: `${country.flagEmoji} ${country.name}`
            };
          })
          .flat()
      : [];

  let currencies =
    typeof props.currencies !== "undefined"
      ? props.currencies
          .map(currency => {
            return {
              value: currency.id,
              label: `${currency.symbol} (${currency.name})`
            };
          })
          .flat()
      : [];

  return (
    <>
      <div className="w-full">
        <form
          className="pt-4 pb-8 mb-4"
          onSubmit={async e => {
            e.preventDefault();
            const res = await createTrip();
            Router.pushRoute("trip", { id: res.data.createTrip.trip.id });
          }}
        >
          <ErrorMessage error={error} />
          <div className="mb-4">
            <Label for="title">Title</Label>
            <input
              className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              required
              onChange={handleChange}
              value={trip.title}
            />
            <ErrorField error={error} field="title" />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-4">
              <Label for="budget">Budget</Label>
              {/* TODO number format */}
              <input
                className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
                id="budget"
                name="budget"
                type="number"
                step="any"
                placeholder="Budget"
                required
                onChange={handleChange}
                value={trip.budget}
              />
              <ErrorField error={error} field="budget" />
            </div>
            <div className="w-1/2 ml-4">
              <Label>Currency</Label>
              <Select
                value={trip.currency}
                onChange={handleChangeCurrency}
                options={currencies}
                instanceId="select-currency-add-trip"
                className="react-select"
                classNamePrefix="react-select"
                isSearchable
              />
              <ErrorField error={error} field="base_currency" />
            </div>
          </div>
          <div className="flex">
            <div className="flex mb-4 w-1/2">
              <div className="w-1/2 mr-4">
                <Label>Start Date</Label>
                {/* TODO locale */}
                <DatePicker
                  customInput={<DatePickerCustomInput />}
                  selected={trip.startDate}
                  onChange={handleChangeStartDate}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d MMMM yyyy H:mm"
                  timeCaption="Time"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  shouldCloseOnSelect
                />
                <ErrorField error={error} field="start_date" />
              </div>
              <div className="w-1/2">
                <Label>End Date</Label>
                {/* TODO locale */}
                <DatePicker
                  customInput={<DatePickerCustomInput />}
                  selected={trip.endDate}
                  onChange={handleChangeEndDate}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  minDate={trip.startDate}
                  selectsEnd
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d MMMM yyyy H:mm"
                  timeCaption="Time"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  shouldCloseOnSelect
                />
                <ErrorField error={error} field="end_date" />
              </div>
            </div>
            <div className="w-1/2 ml-8">
              <Label>Countries</Label>
              <Select
                value={trip.countries}
                onChange={handleChangeCountries}
                options={countries}
                instanceId="select-currency-add-expense"
                className="react-select"
                classNamePrefix="react-select"
                isMulti
                isSearchable
              />
              <ErrorField error={error} field="countries" />
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <Button loading={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTripForm;
