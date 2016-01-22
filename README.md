# ember-receive

It's like a teleporter there and back again!

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]  
![Ember Version][ember-version]

```no-highlight
ember install ember-receive
```

There are many uses for `ember-receive`, but one of the main uses is to unblock blocked components. Let me show you.

```hbs
<!-- app/components/sidebar/template.hbs -->

{{#some-component data=model as |result|}}
  <!--
    You must use `result` here, or somehow pass it elsewhere
    ember-receive to the rescue!
  -->
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
  <!-- everything inside will be rendered where the data came from -->
  {{#send.back}}
    {{#ui.test something=data}}
      Block data
      {{different-component}}
    {{/ui.test}}
  {{/send.back}}
{{/receive-for}}
```

## API

### `pass-to`

* first parameter - Name of the source where the receiver can pick it up, this is required but doesn't have to be unique. String.
* second parameter - The data to pass to the source. This can be anything, primitive, object, array or a hash of contextual components.
* `blockTracking` - Prevent the receiver from sending back anything. Boolean, defaults to `false`.

### `receive-for`

* first parameter - Name of the source to reeive data from. Required.
* first yield - The data that is coming from the source.
* second yield - The send hash, which has one component at the moment:
  - `back` - The teleport back to sender, used in block form and has no parameters/attributes.
    This will not send back if the sender has set `blockTracking=true`.

Can also be used with an `else` block:

```hbs
{{#receive-for 'outer-rim' as |spaceships|}}
  <!-- spaceships here -->
{{else}}
  Lightspeed is too slow
{{/receive-for}}
```

## History

This is based on the work in [ember-portal] (without which this wouldn't be possible) and the experiment to [yield portals] which opened new possibilities for me.

[npm-badge-img]: https://badge.fury.io/js/ember-receive.svg
[npm-badge-link]: http://badge.fury.io/js/ember-receive
[travis-badge]: https://travis-ci.org/knownasilya/ember-receive.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/ember-receive
[ember-observer-badge]: http://emberobserver.com/badges/ember-receive.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-receive
[ember-version]: https://embadge.io/v1/badge.svg?start=2.3.0
[ember-portal]: https://github.com/minutebase/ember-portal
[yield portals]: https://github.com/knownasilya/ember-yielded-portals
