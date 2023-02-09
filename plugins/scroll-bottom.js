import Vue from 'vue'


Vue.directive('scroll-bottom', {
  bind(el, binding, vnode) {
    let vm = vnode.context;
    let callback = binding.value;

    el.scrollBottomEvent = function (event) {
      const { innerHeight, scrollY } = window
      let x =  document.body.clientHeight
      let y = innerHeight + scrollY
      // bottom event
      if (y >= x) {
        return callback.call(vm, event);
      }
    };

    window.addEventListener('scroll', el.scrollBottomEvent)
  },
  unbind(el) {
    window.removeEventListener('scroll', el.scrollBottomEvent)
  }
});
