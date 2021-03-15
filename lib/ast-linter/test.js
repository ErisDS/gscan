// TODO: delete this file, put proper tests in place
const Linter = require('./');

const linter = new Linter();
const template = `
{{test}}
{{#if thing}}a{{else}}b{{/if}}
{{asset "myfile.css"}}
{{match thing "-" "thing"}}
{{ternary (match thing) "true" "false"}}
{{#post}}
    {{!-- allowed, inside post scope --}}
    {{#prev_post}}{{/prev_post}}
{{/post}}

{{!-- not allowed, outside post scope --}}
{{#next_post}}{{/next_post}}

{{#select @custom.data "minimal"}}a{{else select @custom.data "cover"}}b{{else select @custom.header "banner"}}c{{else}}d{{/select}}
`;

const select = `{{#select @custom.data "minimal"}}a{{else select @custom.data "cover"}}b{{else select @custom.header "banner"}}c{{else}}d{{/select}}`;
const messages = linter.verify({
    source: select,
    moduleId: 'test.hbs'
});

console.log(JSON.stringify(messages));