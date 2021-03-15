const Handlebars = require('handlebars');

const template = `
    <h1>{{test}}</h1>
    {{#if img_url feature_image}}
        {{feature_image}}
    {{/if}}
`;

const partial = `
    {{> "my-partial"}}
`;

const select = `{{#select @custom.data "minimal"}}a{{else select @custom.data "cover"}}b{{else select @custom.header "banner"}}c{{else}}d{{/select}}`;

let ast = Handlebars.parse(select);

console.log(require('util').inspect(ast, false, null));
