/** @module */
/** Checks if a type is compatible with the given input.
 * @param data - The data.
 * @param type - Typename or TypeRootObject.
 * @returns {Boolean} - If the data matches the type.
 */
function vaild(data, type) {
    // TODO: return directly.
    // FIXME: typechecking too wrong.
    var result;
    switch (type) {
        case Array:
            result = Array.isArray(data);
            break;
        case Object:
            result = !(vaild(data, Array) || vaild(data, Function) || vaild(data, String) || vaild(data, Number)) || data === null;
            break;
        case Function:
            result = data instanceof Function;
            break;
        case Number:
            result = Number(data) === data;
            break;
        case String:
            result = data instanceof String || typeof data === "string";
            break;
        case RegExp:
            result = data instanceof RegExp;
            break;
        case "Infinity":
        case "inf":
            result = !isFinite(data);
            break;
        case "float":
        case "double":
            result = vaild(data, Number) && !vaild(data, "NaN") && !vaild(data, "Infinity");
            break;
        case "NaN":
            result = isNaN(data);
            break;
        case "int":
            result = vaild(data, Number) && parseInt(data) === data;
            break;
        case "unsigned int":
            result = vaild(data, "int") && data >= 0;
            break;
        case "unsigned Number":
            result = vaild(data, Number) && data >= 0;
            break;
        case "bin":
            result = (vaild(data, String) && data.match(/^[01]+$/)) || vaild(data, "float");
            break;
        case "hex": // FIXME: Confirm compatibility of regex 'i' flag.
            result = (vaild(data, String) && data.toLowerCase().match(/^[0-9a-f]+$/)) || vaild(data, "float");
            break;
        case "bool": // FIXME: this equals to !!data === true || !!data === false, and finally it's 'toBooleanable'.
        case "Boolean":
            result = (data === true || data === false) || (!!data === true || !!data === false);
            break;
        case "undefined":
        case undefined:
            result = data === undefined;
            break;
        case null:
            result = data === null;
            break;
    }
    return !!result;
}
module.exports = vaild;