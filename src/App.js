import React from "react";
import { connect } from "react-redux";
import { fetchData, search, cancel, random } from "./actions/beersActions";
import { setConfig } from "./actions/configActions";

function App(props) {
  console.log(props);
  return (
    <div>
      <select
        name="per-page"
        defaultValue={props.perPage}
        onChange={e => props.setConfig({ perPage: Number(e.target.value) })}
      >
        {[...Array(11).keys()].map(val => {
          return (
            <option key={val} value={val}>
              {val} results
            </option>
          );
        })}
      </select>
      {/* <input
        type="text"
        placeholder="Search beers"
        onChange={e => props.search(e.target.value)}
      /> */}
      <button onClick={props.random}>Random</button>
      {props.status === "pending" ? (
        <>
          <div>is pending</div>
          <button onClick={props.cancel}>cancel</button>
        </>
      ) : props.status === "idle" ? null : (
        <div>{props.data.length}</div>
      )}
      {props.messages.length ? <div>{props.messages[0].text}</div> : null}
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.beers, ...state.config };
}

export default connect(
  mapStateToProps,
  { fetchData, search, cancel, setConfig, random }
)(App);
