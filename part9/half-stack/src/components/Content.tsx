import { CoursePart } from "../types";
import Part from "./Part";

interface SectionListing {
  listing: CoursePart[];
}

const Content = (props: SectionListing) => {
  return (
    <div>
      {props.listing.map((course) => (
        <div key={course.name} style={{ paddingBottom: "10px" }}>
          <Part course={course} />
        </div>
      ))}
    </div>
  );
};

export default Content;
