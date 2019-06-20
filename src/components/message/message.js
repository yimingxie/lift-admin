import Vue from 'vue';
let MessageBox = Vue.extend(require('./message.vue'));
let instance;
var message = function(options){
    if(typeof options === 'string'){
        options = {
            message: options
        }
    }
    //生成组件
    instance = new MessageBox({
        data: options
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    //根据不同的类型，设置不同消息的背景颜色
    if(options.type){
        instance.vm.$el.children[0].className += ` icon__${options.type}`;
    }
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
}

const type = ['success', 'info', 'warning', 'error'];
type.forEach((type)=>{
    message[type] = options =>{
        if(typeof options === 'string'){
            options = {
                message: options
            }
        }
        options.type = type;
        return message(options);
    }
})

export default message;