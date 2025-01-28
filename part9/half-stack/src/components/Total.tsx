interface TotalCount {
  totalCount: number;
}

const Total = (props: TotalCount) => (
  <p>Number of exercises {props.totalCount}</p>
);

export default Total;
