import jwtDecode from "jwt-decode";

export function authCliente() {
    let flag = false;
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const payload = jwtDecode(token);
            console.log(payload)
            if (payload.rol === "cliente")
                flag = true;
        }
    } catch (error) {

    }
    return flag;
}