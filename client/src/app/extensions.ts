function unescapeForXML(a) {
    let str = null;
    if (a === '&amp;') {
        str = '&';
    } else if (a === '&gt;') {
        str = '>';
    } else if (a === '&lt;') {
        str = '<';
    } else if (a === '&quot;') {
        str = '"';
    } else if (a === '&apos;') {
        str = '\'';
    } else {
        str = '';
    }
    return str;
}

// @ts-ignore
String.prototype.unescapeForXML = function (this: string) {
    const target = this;
    return target.replace(/&amp;|&gt;|&lt;|&quot;|&apos;/g, unescapeForXML);
};
