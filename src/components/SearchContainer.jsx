import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import { Wrapper } from "../assets/wrappers/SearchContainer";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";

export const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobsState);

  const { jobTypeOptions, statusOptions } = useSelector(
    (state) => state.jobState
  );

  function handleSearch(e) {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  }

  function debounce() {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1500);
    };
  }

  useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={debounce()}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
