<template>
  <div data-toggle="buttons" class="btn-group">
    <slot name="label" ></slot>
    <label v-for="item in items" :class="{'active': item.value === value}" class="btn btn-default " :key="item.value">
      <i v-if="item.color"  :style="{'color':item.color}">●</i>
      <input type="radio" autocomplete="off" @click="onSelect(item.value)"/>{{ item.label }}
    </label>
    
    <!-- <ul>
      <slot name="item" v-for="item in items" :text="item.text">默认值</slot>
    </ul> -->
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
      },
      header: '来自子组件的头部消息'
    },
    
    // data(){
    //   return{
    //     items:[
    //     {id:1,text:'第1段'},
    //     {id:2,text:'第2段'},
    //     {id:3,text:'第3段'},
    //     ]
    //   }
    // },
    methods: {
      onSelect (value) {
        // this.value = value
        this.$emit('update:value', value)
        
      }
    }
  }
</script>

<style lang="stylus">
.btn-group
  display: inline-block;
  
  .btn
    position relative
    height 22px
    line-height 22px
    text-align: center;
    cursor pointer
    padding 0 7px
    display: inline-block;
    transition: background .3s; 
    font-size: 14px;
    color: #7E8A95;
    letter-spacing: 0.03px;
    white-space: nowrap;
    border-radius: 4px;
    margin 0 0 0 7px
    
    &.active
      background: #4272FF;
      // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
      border-radius: 4px;
      color #fff
    input[type="radio"]
      absolute left top
      appearance none
      opacity 0
    i 
      width: 7px;
      display: inline-block;
      border-radius: 50%;
  span
    display inline-block
    color: rgba(0,0,0,0.85);
</style>
