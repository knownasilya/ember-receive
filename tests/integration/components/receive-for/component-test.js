import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('receive-for', 'Integration | Component | receive for', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{receive-for}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#receive-for}}
    {{else}}
      template block text
    {{/receive-for}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
