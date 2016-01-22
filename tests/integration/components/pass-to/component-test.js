import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pass-to', 'Integration | Component | pass to', {
  integration: true,

  beforeEach() {
    this.inject.service('receivePass');
    this.receivePass.clearData();
  }
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

test('autoPassBack', function(assert) {
  this.set('data', { name: 'Wayne' });

  this.render(hbs`
    <div class="nowhere">
      {{pass-to 'area51' data autoPassBack=true}}
    </div>

    {{#receive-for 'area51' as |data|}}
      <div class="zone">
        {{data.name}}
      </div>
    {{/receive-for}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.nowhere').text().trim(), 'Wayne');
    // TODO: yielding to the block doesn't remove it from the dom
    assert.equal(this.$('.zone').text().trim(), 'Wayne');
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

test('multiple fors in one receive', function (assert) {
  this.set('fors', ['area51', 'outer-limits']);

  this.render(hbs`
    {{pass-to 'area51' 'a'}}
    {{pass-to 'outer-limits' 'b'}}

    {{#receive-for fors mode='multiple' as |data|}}
      {{#each data as |datum|}}
        {{datum.data}}
      {{/each}}
    {{/receive-for}}
  `);

  return wait().then(() => {
    let text = this.$().text();
    let joined = text ? text.split(' ').map(item => item.trim()).join('') : undefined;

    assert.equal(joined, 'ab');
  });
});
