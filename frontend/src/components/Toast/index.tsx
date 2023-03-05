import { useToastStore } from "@/useStore";
import { useMemo } from "react";

const Toast = () => {
  const { message, show } = useToastStore();

  const className = useMemo(() => {
    switch (message.type) {
      case "error":
        return "alert-error";
      case "success":
        return "alert-success";
      case "warning":
        return "alert-warning";
      case "info":
        return "alert-info";
      default:
        return "";
    }
  }, [message.type]);

  return message.text ? (
    <div
      className="toast"
      onAnimationEnd={() => show({ ...message, text: null })}
    >
      <div className={`alert ${className} animate-toast-pop `}>
        <div>
          <span>{message.text.toLocaleUpperCase()}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default Toast;
