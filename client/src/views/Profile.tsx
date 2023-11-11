import { useAuth } from "@/context/authContext";

const Profile: React.FC = () => {
  const { state } = useAuth();
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
