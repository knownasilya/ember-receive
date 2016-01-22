import Ember from 'ember';

export default Ember.Service.extend({
  data: Ember.Object.create(),

  clearData() {
    this.set('data', Ember.Object.create());
  }
});
