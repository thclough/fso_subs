import { useContext } from "react";
import BlendedContext from "../context";

const Notification = () => {
  const [notification] = useContext(BlendedContext);

  // adjustable notification color
  const notStyle = {
    color: notification.color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <>
      {notification.message && (
        <div style={notStyle} data-testid="notification">
          {notification.message}
        </div>
      )}
    </>
  );
};

export default Notification;
