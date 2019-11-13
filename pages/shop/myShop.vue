<template>
	
	<view class="content">
		<view class="common_navigation">
			<image src="/static/cut/leftIcon.png" class="back_icon" @tap="toBack()"></image>
			<view>我的店铺</view>
			<view class="mul_icon_box"></view>
		</view>
		
		<view class="open_close_box">
			<bavigationbar></bavigationbar>
			<view class="open_close_shop">
				<view v-if="isOpenDate == 0">
					<text>暂停营业中，快打开店铺营业吧~</text>
					<button type="primary" @tap="openShop">开店</button>
				</view>
				<view class="gray" v-else>
					<text>正在营业中，关店时需手动关闭。</text>
					<button type="primary" @tap="showPopup">关店</button>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="popup_title">
					<text @tap="cancelPopup">取消</text>
					<block v-if="is_select_start == 0">
						选择关店起始日期
						<text @tap="okStartPopup">确定</text>
					</block>
					<block v-else>
						选择关店结束日期
						<text @tap="okEndPopup">确定</text>
					</block>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			</uni-popup>
		</view>
		<!-- <view class="top">
			<bavigationbar></bavigationbar>
			<view class="spacing"></view>
			<view class="shop-head">
						<image class="item-img" src="../../static/logo.png" alt=""></image>
						<view class="main-left">
							<view class="main-title">
								<text class="tit">就凉快 <text class="iconfont icon-renyuanbaoming"></text></text> -->
								<!-- <text class="distance iconfont icon-shoucang"></text>       -->                   <!-- <like class="icon" :isKeep=like @like="keep"></like>
								
							</view>
							<view class="main-parameter">
								<text class="iconfont icon-xing"></text>店铺总评分4.0
							</view>
							<view class="address">
								<text class="iconfont icon-dingwei"></text>深圳市龙岗区龙翔大道9002号志联佳大厦508
							</view>
							
						</view>
			</view>
			<view class="spacing"></view>
		</view> -->

		<view class="main-scroll">
			<scroll-view scroll-y class="left-aside">
				<view v-for="(item,index) in list" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view scroll-with-animation scroll-y class="right-aside" :scroll-into-view="slideTop" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view v-for="(items,idx) in list" :key="items.id" class="s-list" :id="'main-'+items.id">
					<text class="s-item">{{items.name}}</text>
					<view class="t-list">
						<view @click="navToList(titem.id,titem.goodsFirsttype)" class="t-item" v-for="titem in items.goodsList" :key="titem.id">
							<image :src="titem.smallPic" class="pic_img" mode="widthFix"></image>
							<view class="right_word">
								<view class="t_info">{{titem.goodsName}}</view>
								<view class="p_info"><view class="price_txt"><text>￥</text>{{titem.price}}</view><text>已接单{{titem.totalSale}}</text></view>
							</view>
							<image src="/static/cut/address_edit.png" @tap.stop="toEdit()" class="edit_img" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
	
	
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {LikeModel} from '@/common/models/like.js'
	let Likemodel=new LikeModel()
	import {StoreModel} from '@/common/models/store.js'
	let storemodel=new StoreModel()
	import {UserModel} from '@/common/models/user.js'
	let usermodel=new UserModel()
	import bavigationbar from "@/components/bavigation-bar.vue"
	import like from "@/components/like.vue"

export default {
  name: '',
  components: {
   bavigationbar,
   like,
   uniPopup
  },
  data () {
	  const date = new Date()
	  const years = []
	  const year = date.getFullYear()
	  const months = []
	  const month = date.getMonth() + 1
	  const days = []
	  const day = date.getDate()
	  for (let i = 1990; i <= date.getFullYear(); i++) {
		  years.push(i)
	  }
	  for (let i = 1; i <= 12; i++) {
		  if(i<10){
			  months.push('0'+i)
			}else{
				months.push(i)
			}
	  }
	  for (let i = 1; i <= 31; i++) {
		  if(i<10){
			  days.push('0'+i)
			}else{
				days.push(i)
			}
	  }
    return {
	  like:null,
      sizeCalcState: false,
      tabScrollTop: 0,
      currentId: 0,
      flist: [],	
      slist: [],	
      tlist: [],
	  list:[],
	  sellerId: '',
	  slideTop: '',
	  
	  isOpenDate: 1,
	  is_select_start: 0,
	  startDay: '',
	  dateStart: '',
	  dateEnd: '',
	  title: 'picker-view',
	  years,
	  year,
	  months,
	  month,
	  days,
	  day,
	  value: [9999, month - 1, day - 1],
	  visible: true,
	  indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
    }
  },
  onLoad(option) {
		this.sellerId = option.storeId;
		console.log(this.sellerId);
		this.loadData()	
  },
  onReady() {
  
  },
   methods: {
	   bindChange: function (e) {
		   const val = e.detail.value
		   this.year = this.years[val[0]]
		   this.month = this.months[val[1]]
		   this.day = this.days[val[2]]
		   console.log(val);
	   },
	   cancelPopup(){
			this.$refs.popup.close()
	   },
	   okStartPopup(e){
		   let now = new Date();
		   var selectDate = new Date();
		   selectDate.setFullYear(this.year);
		   selectDate.setMonth(this.month - 1);
		   selectDate.setDate(this.day);
		   if(selectDate.toDateString() != now.toDateString()){
			   this.$api.msg("起始时间必须是今天");
			   return;
		   }
		   this.dateStart = this.year+'-'+this.month+'-'+this.day
		   this.startDay = this.day
		   this.is_select_start = 1
		   console.log(this.dateStart);
	   },
	   okEndPopup(e){
		   let now = new Date();
		   var selectDate = new Date();
		   selectDate.setFullYear(this.year);
		   selectDate.setMonth(this.month - 1);
		   selectDate.setDate(this.day);
		   
		   if(selectDate < now){
			   this.$api.msg("结束时间不能小于今天");
			   return;
		   }
		   this.dateEnd = this.year+'-'+this.month+'-'+this.day
		   console.log(this.dateStart,this.dateEnd);
		   
		   this.is_select_start = 0
			this.$refs.popup.close()
			usermodel.closeShop({
				sellerId: this.sellerId,
				closeStatsDate: this.dateStart,
				closeEndDate: this.dateEnd
			},(data)=>{
				console.log(data);
				usermodel.checkStoreInfo({sellerId: this.sellerId},(res)=>{
					console.log(res.isOpenDate);
					this.isOpenDate = res.isOpenDate;
				})
			})
	   },
	   openShop(){
		   usermodel.openShop({sellerId: this.sellerId},(data)=>{
			   console.log(data);
			   usermodel.checkStoreInfo({sellerId: this.sellerId},(res)=>{
			   	console.log(res.isOpenDate);
			   	this.isOpenDate = res.isOpenDate;
			   })
		   })
	   },
	   toBack(){
	   	uni.navigateBack({
	   		delta: 1
	   	})
	   },
	   showPopup(){
		   uni.showModal({
		   	content: "关店后买家将无法下单，是否确认关店？",
			confirmColor: "#FF6600",
			success: (res) => {
				if(res.confirm == true){
					this.$refs.popup.open()
					this.value = [9999, this.month - 1, this.day - 1]
				}
			}
		   })
		 
	   },
	   //收藏
	   keep(letter){
	   	console.log(letter)
	   	// if(letter){
	   	// 	this.like=letter
	   	// 	console.log("收藏")
	   	// }else{
	   	// 	this.like=letter
	   	// 	console.log("不收藏")
	   		
	   	// }
	   	Likemodel.likeShop("e0f3ddde306c41a3b5e848b59b626d41",letter,(data)=>{
	   		this.like=letter
	   	})
	   },
	 loadData(){
			usermodel.checkStoreInfo({sellerId: this.sellerId},(res)=>{
				console.log(res.isOpenDate);
				this.isOpenDate = res.isOpenDate;
			})
			storemodel.getShopGoods({sellerId:this.sellerId},(data)=>{
				this.list = data;
				this.currentId = this.list[0].id;
			})
			// this.list.forEach(item=>{
			// 	if(!item.pid){
			// 		this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
			// 	}else if(!item.picture){
			// 		this.slist.push(item); //没有图的是2级分类
			// 	}else{
			// 		this.tlist.push(item); //3级分类
			// 	}
			// }) 
		},
		//一级分类点击
		tabtap(item){
			if(!this.sizeCalcState){
				this.calcSize();
			}
			this.slideTop = 'main-'+item.id;
			this.currentId = item.id;
			// let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
			// this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e){
			if(!this.sizeCalcState){
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
			if(tabs.length > 0){
				this.currentId = tabs[0].pid;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize(){
			let h = 0;
			this.slist.forEach(item=>{
				let view = uni.createSelectorQuery().select("#main-" + item.id);
				view.fields({
					size: true
				}, data => {
					item.top = h;
					h += data.height;
					item.bottom = h;
				}).exec();
			})
			this.sizeCalcState = true;
		},
		navToList(id, type){
			console.log(this.sellerId,id,type);
			uni.navigateTo({
				url: `/pages/provide/detail?sellerId=${this.sellerId}&id=${id}&type=${type}`
			})
		}
  },
  onReachBottom() { 
    
  }
}
</script>

<style scoped lang="scss">
	
	.content {
		padding-top: 88rpx;
	}
	page,
	.content {
		box-sizing: border-box;
		height: 100%;
		background-color: #FFFFFF;     
		.top{
			height: 28%;
			.spacing{
				height: 20rpx;
				background-color: #f8f8f8; 
			}
			.shop-head{
				height: 180rpx;
				display: flex;
				padding:30rpx 20rpx;
				image{
					width:120rpx;
					height:120rpx;
					border-radius:10rpx;
					margin-right: 20rpx;
				}
				.main-left{
						width: 590rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;	
						font-size:24rpx;
						font-weight:400;
						color:rgba(160,160,160,1);
						.main-title{
							display: flex;
							justify-content: space-between;						
							.tit{
								font-size:34rpx;
								font-weight:500;
								color:rgba(60,60,60,1);		
								text{
									color: #FFCF27;
									margin-left: 10rpx;
								}	
							}
						}
						.iconfont{
							margin-right: 10rpx;
						}
					}
				
			}
		}
		.main-scroll {
			// height: 72%;
			height: 75vh;
			display: flex;
			.left-aside {
				flex-shrink: 0;
				width: 200upx;
				height: 100%;
				background-color: #fff;
			}
			.f-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100upx;
				font-size: 28upx;    
				color: #969696;
				position: relative;
				&.active{
					color: #FF6600;
					background: #f8f8f8;
					&:before{
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 36upx;
						width: 8upx;
						background-color: #FF6600;
						border-radius: 0 4px 4px 0;
						opacity: .8;
					}
				}
			}
			.right-aside{
				flex: 1;
				overflow: hidden;
				padding-left: 20upx;
			}
			.s-item{
				display: flex;
				align-items: center;
				height: 70upx;
				padding-top: 8upx;
				font-size: 28upx;
				color: #3C3C3C;
			}
			.t-list{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				background: #fff;
				padding-top: 12upx;
				&:after{
					content: '';
					flex: 99;
					height: 0;
				}
			}
			.t-item{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-right: 30rpx;
				box-sizing: border-box;
				width: 100%;
				font-size: 26upx;
				color: #666;
				margin-bottom: 30rpx;
				.pic_img{
					display: block;
					width: 160upx !important;
					height: 160upx !important;
					margin-right: 20rpx;
				}
				.edit_img{
					display: block;
					width: 36rpx;
					height: 37rpx;
					margin-top: 40rpx;
				}
				.right_word{
					width: 62%;
					margin-right: 20rpx;
					.t_info{
						margin-bottom: 30rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-wrap: break-word;
						word-break: break-all;
					}
					.p_info{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text{
							color: #B4B4B4;
							font-size: 22rpx;
						}
						.price_txt{
							color: #FF6600;
							font-size: 26rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
	}
	
	
	
	
	
	
	
	
</style>
