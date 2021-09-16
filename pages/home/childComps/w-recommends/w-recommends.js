// pages/home/childComps/w-recommends/w-recommends.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        recommend:{
            type:Array,
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isLoad:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleImageLoad(){
            if(!this.data.isLoad){
                this.triggerEvent('imageload')
                this.data.isLoad=false
            }
        }
    }
})
