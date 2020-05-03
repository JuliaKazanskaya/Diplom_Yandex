export default class SanitizeHTML {
    check (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
    }
}