const Notification = ({ message, isSuccess }) => {
  if (!message) {
    return null;
  }
  const messageStyle = `notification ${isSuccess ? "success" : "error"}`;
  return <div className={messageStyle}>{message}</div>;
};

export default Notification;
