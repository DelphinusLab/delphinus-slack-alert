export function textCmpPreprosessor(str: string) {
    return str.replace(/&/gm, '&amp;')
        .replace(/</gm, '&lt;')
        .replace(/>/gm, '&gt;')
        .replace(/\s/gm, '');
};
