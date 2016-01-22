import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pass-to', 'Integration | Component | pass to', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
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
