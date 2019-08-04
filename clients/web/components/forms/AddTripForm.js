import { Link, Router } from "../../routes";
import {
  TRIPS_QUERY,
  TRIP_EXPENSES_QUERY,
  TRIP_QUERY
} from "../../graphql/queries";
import { addDays, parse, subDays } from "date-fns";

import Button from "../elements/Button";
import { CREATE_TRIP_MUTATION } from "../../graphql/mutations";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./elements/DatePickerCustomInput";
import ErrorField from "./errors/ErrorField";
import ErrorMessage from "./errors/ErrorMessage";
import Label from "./elements/Label";
import { Mutation } from "react-apollo";
import React from "react";
import Select from "react-select";
import { redirect } from "../../lib/utils";

class AddTripForm extends React.Component {
  state = {
    title: "",
    budget: 0,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    baseCurrency: {
      value: null,
      label: null
    },
    countries: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // TODO: Improve these functions
  handleChangeStartDate = startDate => {
    this.setState({
      startDate
    });
  };

  handleChangeEndDate = endDate => {
    this.setState({
      endDate
    });
  };

  handleChangeCurrency = baseCurrency => {
    this.setState({
      baseCurrency
    });
  };

  handleChangeCountries = countries => {
    this.setState({
      countries
    });
  };

  render() {
    let countries = this.props.countries.data.countries
      .map(country => {
        return {
          value: country.id,
          label: `${country.flagEmoji} ${country.name}`
        };
      })
      .flat();

    let currencies = this.props.currencies.data.currencies
      .map(currency => {
        return {
          value: currency.id,
          label: `${currency.symbol} (${currency.name})`
        };
      })
      .flat();

    return (
      <div className="">
        <div className="w-full">
          <Mutation
            mutation={CREATE_TRIP_MUTATION}
            variables={{
              input: {
                ...this.state,
                baseCurrency: this.state.baseCurrency.value,
                countries: this.state.countries
                  ? this.state.countries.map(country => {
                      return country.value;
                    })
                  : null
              }
            }}
            refetchQueries={({ data }) => {
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
            }}
          >
            {(createTrip, { loading, error }) => (
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
                    onChange={this.handleChange}
                    value={this.state.title}
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
                      onChange={this.handleChange}
                      value={this.state.budget}
                    />
                    <ErrorField error={error} field="budget" />
                  </div>
                  <div className="w-1/2 ml-4">
                    <Label>Currency</Label>
                    <Select
                      value={this.state.currency}
                      onChange={this.handleChangeCurrency}
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
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
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
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
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
                      value={this.state.countries}
                      onChange={this.handleChangeCountries}
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
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default AddTripForm;
