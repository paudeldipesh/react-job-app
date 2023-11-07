import { useState } from "react";
import { useSelector } from "react-redux";
import { BarChartComponent } from "./BarChartComponent";
import { AreaChartComponent } from "./AreaChartComponent";
import { Wrapper } from "../assets/wrappers/ChartsContainer";

export const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector(
    (state) => state.allJobsState
  );

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart((curr) => !curr)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};
