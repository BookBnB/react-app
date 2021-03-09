import Cookie from "js-cookie";

export default function() {
    let expirationDate = localStorage.getItem("expirationDate");
    let currentTime = new Date().getTime() / 1000;
    let expired = !expirationDate || currentTime > expirationDate;
    if (expired) {
        Cookie.remove('token')
    }

    return (!expirationDate || currentTime > expirationDate);
}