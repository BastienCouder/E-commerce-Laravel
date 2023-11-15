import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { state } = useAuth();

  if (!state.user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      {state.user ? (
        <div>
          <p>Welcome, {state.user.name}!</p>
          {/* Ajoutez ici le contenu pour un utilisateur authentifié */}
        </div>
      ) : (
        <div>
          <p>Not authenticated</p>
          {/* Ajoutez ici le contenu pour un utilisateur non authentifié */}
        </div>
      )}
    </div>
  );
};

export default Profile;
