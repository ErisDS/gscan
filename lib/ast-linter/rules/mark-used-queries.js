const Rule = require('./base');
const {getNodeName, classifyNode, transformLiteralToPath, transformPairs} = require('../helpers');

module.exports = class MarkUsedQueries extends Rule {
    _markUsedQueries(node) {
        transformLiteralToPath(node); // Prevents issue when the helper name is double-quoted
        const nodeName = getNodeName(node);
        const helperType = classifyNode(node);

        // helper nodes will break the rendering if there is no matching helper
        // ambiguous nodes simply won't appear if there is no matching helper and no matching context
        if ((helperType === 'helper' || helperType === 'ambiguous') && nodeName === 'get') {
            this.scanner.context.queries.push({
                source: nodeName,
                query: {
                    resource: node.params ? node.params.map(p => p.original)[0] : null,
                    options: node.hash && node.hash.pairs ? transformPairs(node.hash.pairs) : {}
                },
                loc: node.loc
            });
        }
    }

    visitor() {
        return {
            BlockStatement: this._markUsedQueries.bind(this),
            MustacheStatement: this._markUsedQueries.bind(this),
            SubExpression: this._markUsedQueries.bind(this)
        };
    }
};
