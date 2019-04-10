<template>
  <div data-toggle="buttons" class="btn-group">
    <slot name="label"></slot>
    <label v-for="item in items" :class="{'active': item.value === value}" class="btn btn-default " :key="item.value">
      <input type="radio" autocomplete="off" @click="onSelect(item.value)"/>{{ item.label }}
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        twoWay: true
      },
      items: {
        type: Array,
        default: []
      }
    },

    methods: {
      onSelect (value) {
        this.value = value
        this.$emit('update:value', value)
        
      }
    }
  }
</script>

<style lang="stylus">
  @import '../assets/stylus/base'
  .btn-group
    .btn
      position relative
      height 28px
      line-height 28px
      text-align: center;
      cursor pointer
      padding 0 15px
      display: inline-block;
      transition: background .3s;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.03px;
      white-space: nowrap;
      border: 1px solid rgba(56,61,80,0.60);
      border-radius: 16.5px;
      margin 0 7px 0 0
      &.active
        background: #0DBA7F;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
        border-radius: 20px;
      input[type="radio"]
        absolute left top
        appearance none
        opacity 0
    .label
      display inline-block
      margin-right 5px
</style>
