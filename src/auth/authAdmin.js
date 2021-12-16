import jwtDecode from "jwt-decode";

export function authAdmin() {
    let flag = false;
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const payload = jwtDecode(token);
            console.log(payload)
            if (payload.rol === "Admin")
                flag = true;
        }
    } catch (error) {

    }
    return flag;
}