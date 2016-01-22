import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pass-to', 'Integration | Component | pass to', {
  integration: true
});

test('it renders', function(assert) {
  this.set('data', { name: 'Wayne' });

  this.render(hbs`
    {{pass-to 'area51' data}}

    {{#receive-for 'area51' as |data|}}
      <div class="zone">
        {{data.name}}
      </div>
    {{/receive-for}}
  `);

  return wait().then(() => {
    assert.equal(Ember.$('.zone').text().trim(), 'Wayne');
  });
});

test('inverse', function (assert) {
  this.render(hbs`
    {{pass-to 'outer-rim' data}}

    {{#receive-for 'outer-rim' as |data|}}
      <div class="galaxy">
        {{data}}
      </div>
    {{else}}
      <div class="galaxy">
        Nothing
      </div>
    {{/receive-for}}
  `);

  return wait().then(() => {
    assert.equal(Ember.$('.galaxy').text().trim(), 'Nothing');
    this.set('data', 'test');
  })
  .then(() => {
    assert.equal(Ember.$('.galaxy').text().trim(), 'test');
  });
});

test('multiple receives', function (assert) {
  this.set('data', { name: 'Wayne' });

  this.render(hbs`
    {{pass-to 'area51' data}}

    {{#receive-for 'area51' as |data|}}
      {{data.name}}
    {{/receive-for}}

    {{#receive-for 'area51' as |data|}}
      {{data.name}}
    {{/receive-for}}
  `);

  return wait().then(() => {
    let text = this.$().text();
    let joined = text ? text.split(' ').map(item => item.trim()).join('') : undefined;

    assert.equal(joined, 'WayneWayne');
  });
});
