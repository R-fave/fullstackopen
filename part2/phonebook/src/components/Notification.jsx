const Notification = ({ message, notiClass }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={notiClass ? "normal noti" : "error noti"}>{message}</div>
  );
};

export default Notification;
