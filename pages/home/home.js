// pages/home/home.js
import {getMultiData,getGoodsData} from '../../serves/home'

// 返回顶部按钮距离设置变量
const TOP_DISTANCE=1000
const types=['pop','new','sell']

Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners:[],
        recommend:[],
        title:['流行','新款','精选'],
        goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}
        },
        currentType:'pop',
        showBackTop:false,
        isTabFixed:false,
        tabScrollTop:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getMuliData()
        this._getGoodsData('pop')
        this._getGoodsData('new')
        this._getGoodsData('sell')
    },
    // 数据请求方法
    _getMuliData(){
        getMultiData().then(res=>{
            const banners=res.data.data.banner.list
            const recommend=res.data.data.recommend.list
            this.setData({
                banners,
                recommend
            })
        })
    },
    _getGoodsData(type){
        // 获取页面
        const page=this.data.goods[type].page+1
        getGoodsData(type,page).then(res=>{
            // console.log(res)
            // 取数据
            const list=res.data.data.list;
            // 将数据一个一个添加到数组中
            const oldList=this.data.goods[type].list;
            oldList.push(...list)
            // 将数据设置到data的goods中
            const typeKey=`goods.${type}.list`//拼接
            const pageKey=`goods.${type}.page`
            this.setData({
                // goods.pop.list:这种方式拿不到
                [typeKey]:oldList,
                [pageKey]:page
            })
        })
    },
    // 普通点击事件
    handleTabClick(event){
        const index=event.detail.index
        this.setData({
            currentType:types[index]
        })
    },
    handleImageLoad(){
        wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
            this.data.tabScrollTop=rect.top
        }).exec()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log('页面滚动到底部')
        this._getGoodsData(this.data.currentType)
    },
    onPageScroll(options){
        const scrollTop=options.scrollTop
        // 官方：不要在滚动的函数中频繁调用this.setData
        // 修改showBackTop属性
        const flag1=scrollTop>=TOP_DISTANCE
        // 只有两个不同时候才去修改data
        if(flag1!=this.data.showBackTop){
            this.setData({
                showBackTop:flag1
            })
        }
        // 修改isTabFixed属性
        const flag2=scrollTop>=this.data.tabScrollTop
        if(flag2!=this.data.isTabFixed){
            this.setData({
                isTabFixed:flag2
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})