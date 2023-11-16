import { readOrder } from "@/@redux/action/order.action";
import { RootState } from "@/@redux/store";
import { useAuth } from "@/context/authContext";
import { useAppDispatch, useAppSelector } from "@/hook";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuth();
  const dispatch = useAppDispatch();
  const { order, loading, error } = useAppSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (!loading && !error && !order) {
      dispatch(readOrder());
    } else {
      setIsLoading(true);
    }
  }, [dispatch, loading, error, order]);
  console.log(order);

  if (!state.user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="p-4 md:px-20 space-y-2">
      {state.user && <h1>Bonjour, {state.user.name}!</h1>}
    </div>
  );
};

export default Profile;
