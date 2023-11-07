import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { showStats } from "../../features/allJobs/allJobsSlice";

export const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobsState
  );

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
