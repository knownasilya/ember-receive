import Ember from 'ember';
import layout from './template';

const { inject } = Ember;

let PassTo = Ember.Component.extend({
  layout,
  receivePass: inject.service(),

  didReceiveAttrs() {
    var to = this.get('to');
    var data = this.get('data');
    var service = this.get('receivePass');

    if (to && data) {
      Ember.run.schedule('afterRender', this, function () {
        service.set(`data.${to}`, { data: data, id: this.get('elementId') });
      });
    }
  }
});

PassTo.reopenClass({
  positionalParams: ['to', 'data']
});

export default PassTo;
