export { }

declare global {
    interface Date {
        withoutTime: () => Date;
        toISODate: () => string;
    }
}

Date.prototype.withoutTime = function () {
    const d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
}

Date.prototype.toISODate = function () {
    return this.toISOString().substr(0,10);
}