# ember-receive

There are many uses for `ember-receive`, but one of the main uses is to unblock blocked components. Let me show you.

```hbs
<!-- app/components/sidebar/template.hbs -->

{{#some-component data=model as |result|}}
  <!-- You must use `result` here, or somehow pass it elsewhere -->
  <! -- ember-receive to the rescue! -->
  {{pass-to 'outside-area' result}}
{{/some-component}}
```

In another place:
```hbs
<!-- app/application/template.hbs -->

{{#receive-for 'outside-area' as |result send|}}
  <!-- do something with result -->
{{/receive-for}}
```

Check out the demo, `npm start` and `http://localhost:4200`.

## Advanced

```hbs
{{pass-to 'outside-area' (hash test=(component 'some-thing' name=name))}}
```

And consume:

```hbs
{{#receive-for 'outside-area' as |ui send|}}
  <!-- check is necessary or you get unknown helper error -->
  {{#if ui.test}}
    <!-- everything inside will be rendered where the data came from -->
    {{#send.back}}
      {{#ui.test something=data}}
        Block data
        {{different-component}}
      {{/ui.test}}
    {{/send.back}}
  {{/if}}
{{/receive-for}}
