import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

interface UserMenuButtonProps {
    ///
}

export default function UserMenuButton({}: UserMenuButtonProps) {
    const user = "";
    return user ? (
        <Link to={`/profile`} onClick={() => {}}>
            <AiOutlineUser size={25} />
        </Link>
    ) : (
        <Link to={`/auth`} onClick={() => {}}>
            <AiOutlineUser size={25} />
        </Link>
    );
}
