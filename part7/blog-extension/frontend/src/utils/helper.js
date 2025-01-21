const flashNotification = (message, color, time_ms, disp) => {
  disp({
    payload: {
      message,
      color,
    },
  });
  setTimeout(
    () =>
      disp({
        payload: {
          message: null,
          color: null,
        },
      }),
    time_ms,
  );
};

export default flashNotification;
