import React from "react";
import { Mutation } from "react-apollo";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { subDays, addDays, parse } from "date-fns";
import uniqBy from "lodash/uniqBy";
import classNames from "classnames";
import { Link, Router } from "../../routes";
import { redirect } from "../../lib/utils";
import Button from "../elements/Button";
import ErrorMessage from "./errors/ErrorMessage";
import ErrorField from "./errors/ErrorField";
import Label from "./elements/Label";
import DatePickerCustomInput from "./elements/DatePickerCustomInput";
import { CREATE_EXPENSE_MUTATION } from "../../graphql/mutations";
import { TRIP_EXPENSES_QUERY } from "../../graphql/queries";

class AddExpenseForm extends React.Component {
  state = {
    title: "",
    amount: 0,
    date: new Date(),
    currency: {
      value: null,
      label: null
    },
    trip: this.props.trip.id
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeDate = date => {
    this.setState({
      date
    });
  };

  handleChangeCurrency = currency => {
    this.setState({
      currency
    });
  };

  render() {
    let currencies = this.props.trip.countries
      .map(country => {
        return country.currencies.map(currency => {
          return {
            value: currency.id,
            label: `${currency.symbol} (${currency.name})`
          };
        });
      })
      .flat();
    currencies.push({
      value: this.props.trip.baseCurrency.id,
      label: `${this.props.trip.baseCurrency.symbol} (${
        this.props.trip.baseCurrency.name
      })`
    });
    currencies = uniqBy(currencies, "value");
    return (
      <div className="">
        <div className="w-full">
          <Mutation
            mutation={CREATE_EXPENSE_MUTATION}
            variables={{
              input: { ...this.state, currency: this.state.currency.value }
            }}
            refetchQueries={[
              {
                query: TRIP_EXPENSES_QUERY,
                variables: { tripId: this.props.trip.id }
              }
            ]}
          >
            {(createExpense, { loading, error }) => (
              <form
                className="pt-4 pb-8 mb-4"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createExpense();
                  Router.pushRoute("trip", { id: this.props.trip.id });
                }}
              >
                <ErrorMessage error={error} />
                <div className="mb-4">
                  <Label for="title">Title</Label>
                  <input
                    className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
                    name="title"
                    id="title"
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
                    <Label for="amount">Amount</Label>
                    {/* TODO number format */}
                    <input
                      className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
                      name="amount"
                      id="amount"
                      type="number"
                      step="any"
                      placeholder="Amount"
                      required
                      onChange={this.handleChange}
                      value={this.state.amount}
                    />
                    <ErrorField error={error} field="amount" />
                  </div>
                  <div className="w-1/2 ml-4">
                    <Label for="select-currency-add-expense">Currency</Label>
                    <Select
                      value={this.state.currency}
                      onChange={this.handleChangeCurrency}
                      options={currencies}
                      instanceId="select-currency-add-expense"
                      className="react-select"
                      classNamePrefix="react-select"
                    />
                    <ErrorField error={error} field="currency" />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Date</Label>
                  {/* TODO locale */}
                  <DatePicker
                    customInput={<DatePickerCustomInput />}
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    minDate={new Date(this.props.trip.startDate)}
                    maxDate={new Date(this.props.trip.endDate)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="d MMMM yyyy H:mm"
                    timeCaption="Time"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    shouldCloseOnSelect={true}
                  />
                  <ErrorField error={error} field="date" />
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

export default AddExpenseForm;
