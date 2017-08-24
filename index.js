const {inspect} = require('util')
const exec = require('child_process').exec
const semver = require('semver')
const chalk = require('chalk')
const debug = require('debug')('frege')

/**
 * package.json reversing
 * @param packageJson full path of package.json file
 * @param options
 * @returns {string}
 */
const reverse = function (packageJson, options) {
  const config = require(packageJson)
  if (!options) {
    options = {}
  }
  const scripts = []
  const getPackages = dependencies => {
    const packages = []
    debug(inspect(dependencies, false, null))
    for (const item of Object.keys(dependencies)) {
      const packageWithVersion = options.latest ? `${item}` : `${item}@"${semver.Range(dependencies[item]).range}"`
      packages.push(packageWithVersion)
    }
    return packages
  }

  let install = options.yarnInstall ? 'yarn add' : 'npm i -S'
  let installDev = options.yarnInstall ? 'yarn add --dev' : 'npm i -D'
  if (options.productionOnly) {
    if (config.dependencies) {
      scripts.push(`${install} ${getPackages(config.dependencies).join(' ')}`)
      // scripts.push(`npm i -S ${getPackages(config.dependencies).join(' ')}`)
    }
  } else if (options.devOnly) {
    if (config.devDependencies) {
      scripts.push(`${installDev} ${getPackages(config.devDependencies).join(' ')}`)
    }
  } else {
    if (config.dependencies) {
      scripts.push(`${install} ${getPackages(config.dependencies).join(' ')}`)
    }
    if (config.devDependencies) {
      scripts.push(`${installDev} ${getPackages(config.devDependencies).join(' ')}`)
    }
  }

  console.log(chalk.inverse(scripts.join('\r\n')))

  // update package.json?
  if (options.update) {
    console.log('update package.json ...')
    exec(scripts.join('\r\n'), (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return scripts
      }
      console.log(chalk.cyan(stdout))
      console.log(chalk.yellow(stderr))
      return scripts
    })
  } else {
    return scripts
  }
}

const update = function (scripts) {

}

module.exports = {reverse, update}
