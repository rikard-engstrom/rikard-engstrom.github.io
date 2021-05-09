export { }

declare global {
    interface Number {
        formatTimeSpan: () => string;
    }

    interface Array<T> {
        sum: () => number;
    }
}

Number.prototype.formatTimeSpan = function () {
    const duration = this.valueOf();
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60) - hours * 60;
    const seconds = duration - (hours * 3600) - (minutes * 60);

    let timeSpan = hours > 0 ? hours + ':' : '';
    timeSpan += minutes < 10 && hours > 0 ? '0' : '';
    timeSpan += minutes + ':';
    timeSpan += seconds < 10 ? '0' + seconds : seconds;

    return timeSpan;
}

Array.prototype.sum = function () {
    if (this == null || this.length == 0)
        return 0;

    return this.reduce((state, e) => state + e);
}
