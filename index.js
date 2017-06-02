const inspect = require('util').inspect;
const semver = require('semver');
const debug = require('debug')('frege');

/**
 * package.json reversing
 * @param packageJson full path of package.json file
 * @param options
 * @returns {string}
 */
const reverse = function (packageJson, options) {
    const config = require(packageJson);
    if (!options) {
        options = {};
    }
    const packages = [];
    const getPackages = dependencies => {
        debug(inspect(dependencies, false, null));
        for (const item of Object.keys(dependencies)) {
            const packageWithVersion = options.latest ? `${item}@latest` : `${item}@"${semver.Range(dependencies[item]).range}"`;
            packages.push(packageWithVersion);
        }
    };

    if (config.dependencies && !options.devOnly) {
        getPackages(config.dependencies);
    }

    if (config.devDependencies && !options.productionOnly) {
        getPackages(config.devDependencies);
    }

    return `npm install --save ${packages.join(' ')}`;
};

module.exports = { reverse };
