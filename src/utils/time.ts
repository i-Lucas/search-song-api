function time(locale: string = 'pt-br'): string {
    return new Date(Date.now()).toLocaleTimeString(locale);
};

function date(locale: string = 'pt-br'): string {
    return new Date(Date.now()).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

function formated(locale: string = 'pt-br'): string {
    return `${date(locale)} ${time(locale)}`;
};

const factory = { time, date, formated };
export default factory;