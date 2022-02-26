import { FaRegMap } from "react-icons/fa";

const EmptyState = ({message = "None", Icon = FaRegMap}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        {<Icon className="empty-icon" />}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;