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
          severity: null,
        },
      }),
    time_ms,
  );
};

export default flashNotification;
