interface notificationProps {
  notification: string;
}

const Notification = (props: notificationProps) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: "red",
  };

  return (
    <>{props.notification && <div style={style}>{props.notification}</div>}</>
  );
};

export default Notification;
