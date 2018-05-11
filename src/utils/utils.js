export const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1)

export const dateFormatter = (timestamp) => {
    const d = new Date(timestamp);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
}

export const guid = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}