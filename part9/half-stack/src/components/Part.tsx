import { CoursePart } from "../types";

interface sectionContent {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: sectionContent) => {
  switch (props.course.kind) {
    case "basic":
      return (
        <>
          <div>
            <b>
              {props.course.name} {props.course.exerciseCount}
            </b>
          </div>
          {props.course.description && <i>{props.course.description}</i>}
        </>
      );
    case "group":
      return (
        <>
          <b>
            {props.course.name} {props.course.exerciseCount}
          </b>
          <br />
          project exercises {props.course.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <b>
            {props.course.name} {props.course.exerciseCount}
          </b>
          <br />
          {props.course.description && <i>{props.course.description}</i>}
          <br />
          submit to {props.course.backgroundMaterial}
          <br />
        </>
      );
    case "special":
      return (
        <>
          <b>
            {props.course.name} {props.course.exerciseCount}
          </b>
          <br />
          <i>{props.course.description}</i>
          <br />
          requirements: {props.course.requirements.join(", ")}
        </>
      );
    default:
      return assertNever(props.course);
  }
};

export default Part;
