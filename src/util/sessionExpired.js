export default function() {
    let expirationDate = localStorage.getItem("expirationDate");
    let currentTime = new Date().getTime() / 1000;

    return (!expirationDate || currentTime > expirationDate);
}