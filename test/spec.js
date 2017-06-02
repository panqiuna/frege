import { resolve } from 'path';
import test from 'ava';
import { expect } from 'chai';

import { reverse } from '../index';
const testFile = resolve(__dirname, './material/package.json');

test('Reverse package.json', t => {
    try {
        // productionOnly: false, latest: false
        let installationString = reverse(testFile, {
            productionOnly: false,
            latest: false
        });
        expect(installationString).to.be.equal('npm install --save console-polyfill@">=0.2.3 <0.3.0" echarts@">=3.6.0 <4.0.0" @ava/babel-preset-stage-4@">=1.0.0 <2.0.0" autoprefixer@">=6.7.7 <7.0.0"');

        // productionOnly: true, latest: false
        installationString = reverse(testFile, {
            productionOnly: true,
            latest: false
        });
        expect(installationString).to.be.equal('npm install --save console-polyfill@">=0.2.3 <0.3.0" echarts@">=3.6.0 <4.0.0"');

        // productionOnly: false, latest: true
        installationString = reverse(testFile, {
            productionOnly: false,
            latest: true
        });
        expect(installationString).to.be.equal('npm install --save console-polyfill@latest echarts@latest @ava/babel-preset-stage-4@latest autoprefixer@latest');

        t.pass();
    } catch (err) {
        console.error(err);
        t.fail();
    }
});
