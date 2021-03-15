const Rule = require('./base');
const {getNodeName, logNode} = require('../helpers');
const {replaceStringTransformer} = require('common-tags');

module.exports = class NoPrevNextPostOutsidePostContext extends Rule {
    _check(node) {
        const nodeName = getNodeName(node);
        console.log('get node name', nodeName);

        if (nodeName === 'select') {
            // console.log(require('util').inspect(node, false, null));
            // console.log(node.inverse.chained);
            console.log(node.params);
            // this.scope.popFrame();

            if (node.inverse.body[0].type !== 'BlockStatement') {
                console.log('empty else = this is the default option');
            }

            return;
        }
    }

    visitor() {
        return {
            BlockStatement: this._check.bind(this),
            MustacheStatement: this._check.bind(this),
            SubExpression: this._check.bind(this)
        };
    }
};