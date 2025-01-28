interface course {
  name: string;
  exerciseCount: number;
}

interface sectionContent {
  courses: course[];
}

const Content = (props: sectionContent) => {
  return (
    <>
      <p>
        {props.courses[0].name} {props.courses[0].exerciseCount}
      </p>
      <p>
        {props.courses[1].name} {props.courses[1].exerciseCount}
      </p>
      <p>
        {props.courses[2].name} {props.courses[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
