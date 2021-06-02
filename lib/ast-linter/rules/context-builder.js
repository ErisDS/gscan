const Rule = require('./base');
const {getNodeName, logNode} = require('../helpers');
const {replaceStringTransformer} = require('common-tags');

module.exports = class NoPrevNextPostOutsidePostContext extends Rule {
    _check(node) {
        const nodeName = getNodeName(node);
        console.log('get node name', nodeName);

        const settings = this.context.settings;

        if (nodeName === 'select') {
            // console.log(require('util').inspect(node, false, null));
            // console.log(node.inverse.chained);

            const setting = node.params[0];
            const value = node.params[1];

            if (setting.type === 'PathExpression' && setting.parts[0] === 'custom') {
                console.log(require('util').inspect(node.hash, false, null));

                let name = setting.parts[1];
                if (!settings[name]) {
                    settings[name] = [];
                }

                if (value.type === 'StringLiteral') {
                    settings[name].push(value.original);
                }

                if (node.inverse.body[0].type !== 'BlockStatement') {
                    settings[name].push('default');
                }
            }

            // this.scope.popFrame();
            console.log(settings);

            return;
        }
    }

    visitor() {
        this.context = {
            settings: {}
        };
        return {
            BlockStatement: this._check.bind(this),
            MustacheStatement: this._check.bind(this),
            SubExpression: this._check.bind(this)
        };
    }
};