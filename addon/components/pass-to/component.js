import Ember from 'ember';
import layout from './template';

const { run, inject } = Ember;

let PassTo = Ember.Component.extend({
  layout,
  receivePass: inject.service(),
  blockTracking: false,

  didReceiveAttrs() {
    var to = this.get('to');
    var data = this.get('data');

    run.schedule('afterRender', this, 'sendToService', to, data);
  },

  sendToService(to, data) {
    var service = this.get('receivePass');
    var blockTracking = this.get('blockTracking');

    if (to && data) {
      let hash = { data };
      let key = `data.${to}`;
      let items = service.get(key);

      if (!blockTracking) {
        hash.id = this.get('elementId');
      }

      if (!items) {
        items = Ember.A();
        service.set(key, items);
      }

      items.pushObject(hash);
    }
  }
});

PassTo.reopenClass({
  positionalParams: ['to', 'data']
});

export default PassTo;
