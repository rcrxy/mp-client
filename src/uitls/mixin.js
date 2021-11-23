import Vue from "vue";
// import { mapMutations, mapActions } from "vuex";

Vue.mixin({
   data() {
      return {};
   },
   // watch: {
   //    $route(to, from) {
   //       let parentUrl = this.$route.path.slice(0, this.$route.path.lastIndexOf("/"));
   //       this.setRoute({ parentUrl });
   //    },
   // },
   methods: {
      // ...mapMutations(["setRoute"]),
      mixin_jumpUrl(url) {
         if (this.$route.path != url) {
            this.$router.push(url);
         }
      },
   },
});
