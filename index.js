var Emitter = require("emitter");

module.exports = filter;

function filter(fn, ctx) {
    function Filter(item) {
        return fn.call(ctx, item);
    }
    Emitter.call(Filter);
    Filter.on = Emitter.prototype.on;
    Filter.off = Emitter.prototype.off;
    Filter.emit = Emitter.prototype.emit;

    Object.keys(ctx).forEach(function (key) {
        Object.defineProperty(Filter, key, {
            get: function () { return ctx[key] },
            set: function (value) {
                ctx[key] = value;
                Filter.emit("change");
            }
        });
    });

    return Filter;
}