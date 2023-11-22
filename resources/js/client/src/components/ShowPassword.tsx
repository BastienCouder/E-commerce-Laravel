import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ShowPasswordProps {
  password: string | null | undefined;
  setPassword: (value: string) => void;
}

export default function ShowPassword({
  password,
  setPassword,
}: ShowPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="w-full flex flex-col space-y-1 relative">
      <Input
        autoComplete="off"
        placeholder="Mot de passe"
        required={false}
        type={showPassword ? "text" : "password"}
        value={password!}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        aria-label="Montrer mot de passe"
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute text-zinc-900 top-1.5 right-0 px-2 outline-none text-xl cursor-pointer"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  );
}
