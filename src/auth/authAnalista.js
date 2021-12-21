import jwtDecode from "jwt-decode";

export function authAnalista() {
    let flag = false;
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const payload = jwtDecode(token);
            if (payload.rol === "Analista")
                flag = true;
        }
    } catch (error) {

    }
    return flag;
}