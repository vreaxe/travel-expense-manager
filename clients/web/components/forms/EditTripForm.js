import { Link, Router } from "../../routes";
import React, { useState } from "react";
import {
  TRIPS_QUERY,
  TRIP_EXPENSES_QUERY,
  TRIP_QUERY
} from "../../graphql/queries";
import { addDays, parse, subDays } from "date-fns";
import { formatSelectOptions, redirect } from "../../lib/utils";

import Button from "../elements/Button";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./elements/DatePickerCustomInput";
import ErrorField from "./errors/ErrorField";
import ErrorMessage from "./errors/ErrorMessage";
import Input from "./elements/Input";
import Label from "./elements/Label";
import Select from "react-select";
import { UPDATE_TRIP_MUTATION } from "../../graphql/mutations";
import classNames from "classnames";
import uniqBy from "lodash/uniqBy";
import { useMutation } from "@apollo/react-hooks";

const EditTripForm = props => {
  const [trip, setTrip] = useState({
    title: props.trip.title,
    budget: props.trip.budget,
    startDate: new Date(props.trip.startDate),
    endDate: new Date(props.trip.endDate),
    countries: formatSelectOptions(props.trip.countries, country => {
      return {
        value: country.id,
        label: `${country.flagEmoji} ${country.name}`
      };
    })
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

  const handleChangeCountries = countries => {
    setTrip({
      ...trip,
      countries
    });
  };

  const [updateTrip, { loading, error }] = useMutation(UPDATE_TRIP_MUTATION, {
    variables: {
      id: props.trip.id,
      input: {
        ...trip,
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
          variables: { id: data.updateTrip.trip.id }
        },
        {
          query: TRIP_EXPENSES_QUERY,
          variables: { tripId: data.updateTrip.trip.id }
        },
        {
          query: TRIPS_QUERY
        }
      ];
    }
  });

  let countries = formatSelectOptions(props.countries, country => {
    return {
      value: country.id,
      label: `${country.flagEmoji} ${country.name}`
    };
  });

  return (
    <>
      <div className="w-full">
        <form
          className="pt-4 pb-8 mb-4"
          onSubmit={async e => {
            e.preventDefault();
            const res = await updateTrip();
            Router.pushRoute("trip", { id: res.data.updateTrip.trip.id });
          }}
        >
          <ErrorMessage error={error} />
          <div className="mb-4">
            <Label for="title">Title</Label>
            <Input
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
              <Input
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
              <p className="text-xl mt-4 text-gray-800">
                {props.trip.baseCurrency.symbol} ({props.trip.baseCurrency.name}
                )
              </p>
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
                instanceId="select-country-edit-trip"
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

export default EditTripForm;
