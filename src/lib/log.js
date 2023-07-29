'use strict';

const log = (data, logs) => {
    return new logs({
        time: new Date(),
        info: data.info,
        type: data.type,
        function: data.function
    }).save();
};

module.exports = log;

