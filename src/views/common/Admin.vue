<template>
  <div class="main-wrap">
    <div>管理员个人中心</div>

  </div>
</template>

<script>

export default {

  layout: 'admin',

  data() {
    return {

    }
  },
  mounted() {
    this.$store.commit('SWITCH_LAYOUT', 'admin')
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
