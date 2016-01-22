import Ember from 'ember';
import layout from './template';

const { inject } = Ember;

let ReceiveFor = Ember.Component.extend({
  layout,
  receivePass: inject.service(),

  didReceiveAttrs() {
    var forName = this.get('for');
    //var path = `receivePass.data.${forName}`;
    var service = this.get('receivePass');

    if (forName) {
      service.addObserver(`data.${forName}`, this, () => {
        var data = this.get(`receivePass.data.${forName}`);

        this.set('data', data);
      });
    }
  }
});

ReceiveFor.reopenClass({
  positionalParams: ['for']
});

export default ReceiveFor;
