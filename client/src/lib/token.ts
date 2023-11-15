import Cookies from "js-cookie";

export const authToken: string | undefined = Cookies.get("authToken");
