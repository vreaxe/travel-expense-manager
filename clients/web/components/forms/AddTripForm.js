import React from "react";
import { Mutation } from "react-apollo";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { subDays, addDays, parse } from "date-fns";
import classNames from "classnames";
import { Link, Router } from "../../routes";
import { redirect } from "../../lib/utils";
import ErrorMessage from "../errors/ErrorMessage";
import ErrorField from "../errors/ErrorField";
import DatePickerCustomInput from "../elements/DatePickerCustomInput";
import { CREATE_TRIP_MUTATION } from "../../graphql/mutations";
import {
  TRIP_QUERY,
  TRIP_EXPENSES_QUERY,
  TRIPS_QUERY
} from "../../graphql/queries";

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
    countries: []
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
                countries: this.state.countries.map(country => {
                  return country.value;
                })
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
                  <label className="block text-gray-700 text-xl font-bold mb-2">
                    Title
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
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
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                      Budget
                    </label>
                    {/* TODO number format */}
                    <input
                      className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
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
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                      Currency
                    </label>
                    <Select
                      value={this.state.currency}
                      onChange={this.handleChangeCurrency}
                      options={currencies}
                      instanceId="select-currency-add-expense"
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
                      <label className="block text-gray-700 text-xl font-bold mb-2">
                        Start Date
                      </label>
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
                      <label className="block text-gray-700 text-xl font-bold mb-2">
                        End Date
                      </label>
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
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                      Countries
                    </label>
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
                <div className="flex items-center justify-end">
                  <button
                    className={classNames(
                      "rounded-lg bg-green-500 hover:bg-green-600 text-center text-white mt-5 py-2 px-6",
                      { spinner: loading }
                    )}
                    type="submit"
                  >
                    Save
                  </button>
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
