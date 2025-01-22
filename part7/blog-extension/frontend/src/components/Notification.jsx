import { useContext } from "react";
import BlendedContext from "../context";
import { Alert } from "@mui/material";

const Notification = () => {
  const [notification] = useContext(BlendedContext);

  // adjustable notification color
  // const notStyle = {
  //   severity: notification.color,
  //   background: "lightgrey",
  //   fontSize: "20px",
  //   borderStyle: "solid",
  //   borderRadius: "5px",
  //   padding: "10px",
  //   marginBottom: "10px",
  // };

  return (
    <>
      {notification.message && (
        <Alert severity={notification.severity} data-testid="notification">
          {notification.message}
        </Alert>
      )}
    </>
  );
};

export default Notification;
