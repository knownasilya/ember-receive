import Ember from 'ember';
import layout from './template';

const { inject, computed } = Ember;

let ReceiveFor = Ember.Component.extend({
  receivePass: inject.service(),
  layout,
  mode: 'single', // or 'multiple'
  singleMode: computed.equal('mode', 'single'),

  forNames: computed('for', {
    get() {
      var forNames = this.get('for');

      return Array.isArray(forNames) ? forNames : [forNames];
    }
  }),

  didReceiveAttrs() {
    var forNames = this.get('forNames');
    var singleMode = this.get('singleMode');
    var service = this.get('receivePass');

    if (forNames && forNames.length) {
      forNames.forEach(forName => {
        service.addObserver(`data.${forName}.[]`, this, () => {
          let list = this.get(`receivePass.data.${forName}`);

          if (list && list.length) {
            let currentData = this.get('data');

            if (!singleMode && currentData) {
              currentData.pushObjects(list);
            } else {
              this.set('data', list.copy ? Ember.A(list.copy()) : undefined);
            }
          }
        });
      });
    }
  }
});

ReceiveFor.reopenClass({
  positionalParams: ['for']
});

export default ReceiveFor;
