<template>
	<view>
		<!-- <view class="status_bar">  
		    <view class="top_view"></view>  
		</view> -->
		<view class="top_fixed">
			<view @tap="toSelectFixed()">
				<image src="/static/cut/fixed_icon.png" mode=""></image>
				<text>{{pickerText}}</text>
			</view>
			<image src="/static/cut/mess_icon.png" @tap="toMessage()" mode=""></image>
		</view>
		<!-- 顶部导航 -->
		<view class="top">
			<!-- <view class="top-Location" @click="showMulLinkageThreePicker">
				<text>{{pickerText}}</text><image class="drop-down" src="/static/cut/drop-down.png" mode=""></image>
			</view> -->
			<view class="top-search" @click="clicksearch">
				<view>
					<image class="lf" src="../../static/cut/ss.png" mode=""></image>
					<text>搜索标题</text>
				</view>
				<image class="rt" src="../../static/cut/yy.png" mode=""></image>
			</view>
		</view>
		<view class="place"></view>
		
		<!-- 授权登录按钮 -->
		<view class="getuser_box" v-if="!hasLogin">
			<text>登录后可领取海量权益哦</text>
			<button @tap="toUserInfo"> 马上登录 </button>
		</view>
		
		<!-- 轮播图 -->
		<view class="carousel-section">
			  <swiper class="swiper" circular="true" autoplay="true" @change="changeSwiper">
				<swiper-item v-for="(item,index) in Swiperlist" :key="index">
					<image class="swiper-img" :src="item.coverImg" mode=""></image>
				</swiper-item>
				
			</swiper>
			<!-- 轮播指示点样式修改 -->
		  <view class="dots">
			  <block v-for="(item,index) in Swiperlist.length" :key="item">
				  <view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
			  </block>
		  </view>
		</view>
		<!-- 分类 -->
		<view class="icons">
			<view class="item" @click="Jump(index+1)" v-for="(item,index) in Iconslist" :key="index">				 
				<view>
					<image :src="item.coverImg" mode="widthFix"></image>
				</view>
				<text>{{item.title}}</text>
			</view>
			
			
		</view>
		<view class="bg" @click="Jump(1)"></view>
		<!-- 生活服务 -->
		<view class="life-box">
			<view class="title">
				<view class="mark"></view><text>生活服务</text>
			</view>
			<view class="life-cen">
				<view class="lf">
					<image :src="Otherlisttwo[0].coverImg" mode=""></image>
				</view>
				<view class="rt">
					<image :src="Otherlisttwo[1].coverImg" mode=""></image>
					<image :src="Otherlisttwo[2].coverImg" mode=""></image>
				</view>
			</view>
			<view class="life-bottom">
				<view class="item" v-for="(item,index) in Otherlistone" :key="index">
					<image :src="item.coverImg" mode="widthFix"></image>
				</view>
				
			</view>
		</view>
		<view class="bg"></view>
		<!-- 其他服务 -->
		<view class="Other-box">
			<view class="title">
				<view class="mark"></view><text>其他服务</text>
			</view>
			<view class="item-img">
				<image v-for="(item,index) in Otherlistthree" :key="index" :src="item.coverImg" mode=""></image>				
			</view>	
		</view>
		<view class="bg"></view>
		<!-- #ifdef APP-PLUS || H5 -->
		<!-- <view class="tabs" v-if="isActive"></view>
		<view :class="!isActive ? '':'activeClass'" class="tabs">
			<view class="item" @tap="provide">
				<text :class="chenck ? 'checkclass' : ''">TA的提供</text>
				<view :class="chenck ? 'checkclassbg' : ''"></view>
			</view>
			<view class="item" @tap="provided">
				<text :class="!chenck ? 'checkclass' : ''">TA的需求</text>
				<view :class="!chenck ? 'checkclassbg' : ''"></view>
			</view>
		</view> -->
		<!-- #endif -->
		
		<view class="content">
			
			<view class="list">
				<!--  TA的提供-->
				<view class="list-lf" v-if="chenck">
					<view class="item" v-for="(item,index) in listlf" :key="index" @click="toGoods(item)">
						<image class="item-img" :src="item.smallPic" alt=""></image>
						<view class="main-left">
							<view class="main-title">
								<view class="tit ellipsis">{{item.goodsName}}</view>
								<text class="distance">1.6km</text>
							</view>
							<view class="main-parameter">
								<view>
									<text class="fh">￥</text>
									<text class="price">{{item.price}}</text>
								</view>
								<text class="volume">月销{{item.monthSale}}</text>
								<text class="volume">免费配送</text>
								<image src="/static/cut/car.png" mode=""></image>
							</view>
						</view>
						
					</view>
					
				</view>
				<!-- TA的需求 -->
				<view class="list-rt" v-else>
					
					<view class="item"  @click="toGoods(item.id)">
						<view class="upper-part">
							<image class="item-img" src="../../static/logo.png" alt=""></image>
							<view class="main-left">
								<view class="main-title">
									<text class="tit">就凉快 <text class="iconfont icon-renyuanbaoming"></text></text>
									<text class="distance">1.6km</text>
									
								</view>
								<view class="main-parameter">
									<text class="score"><text class="iconfont icon-xing"></text>4.4</text>
									<text class="serviceunm">享受服务：10次</text>
								</view>
							</view>
						</view>
						<view class="central-section">
							<view class="it">
								<text class="iconfont icon-wenzhang2"></text><text>我现需要：一罐5kg煤气</text>
							</view>
							<view class="it">
								<text class="iconfont icon-shijian"></text><text>服务时间：3月11日</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务地点：广东省深圳市龙岗区志联佳大厦508号</text>
							</view>
						</view>
						<view class="lower-part">
							<text>2018年10月15日 15:30</text>
							<view class="buts">
								<view class="theme-button-inverse">联系TA</view>															
								<view class="theme-button">立即抢单</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="upper-part">
							<image class="item-img" src="../../static/logo.png" alt=""></image>
							<view class="main-left">
								<view class="main-title">
									<text class="tit">就凉快 <text class="iconfont icon-xing"></text></text>
									<text class="distance">1.6km</text>
									
								</view>
								<view class="main-parameter">
									<text class="score"><text class="iconfont icon-xing"></text>4.4</text>
									<text class="serviceunm">享受服务：10次</text>
								</view>
							</view>
						</view>
						<view class="central-section">
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>我现需要：一罐5kg煤气</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务时间：3月11日</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务地点：广东省深圳市龙岗区志联佳大厦508号</text>
							</view>
						</view>
						<view class="lower-part">
							<text>2018年10月15日 15:30</text>
							<view class="buts">
								<view class="theme-button-inverse">联系TA</view>															
								<view class="theme-button">立即抢单</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="upper-part">
							<image class="item-img" src="../../static/logo.png" alt=""></image>
							<view class="main-left">
								<view class="main-title">
									<text class="tit">就凉快 <text class="iconfont icon-xing"></text></text>
									<text class="distance">1.6km</text>
									
								</view>
								<view class="main-parameter">
									<text class="score"><text class="iconfont icon-xing"></text>4.4</text>
									<text class="serviceunm">享受服务：10次</text>
								</view>
							</view>
						</view>
						<view class="central-section">
							<view class="it">
								<text class="iconfont icon-wenzhang2"></text><text>我现需要：一罐5kg煤气</text>
							</view>
							<view class="it">
								<text class="iconfont icon-shijian"></text><text>服务时间：3月11日</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务地点：广东省深圳市龙岗区志联佳大厦508号</text>
							</view>
						</view>
						<view class="lower-part">
							<text>2018年10月15日 15:30</text>
							<view class="buts">
								<view class="theme-button-inverse">联系TA</view>															
								<view class="theme-button">立即抢单</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="upper-part">
							<image class="item-img" src="../../static/logo.png" alt=""></image>
							<view class="main-left">
								<view class="main-title">
									<text class="tit">就凉快 <text class="iconfont icon-xing"></text></text>
									<text class="distance">1.6km</text>
									
								</view>
								<view class="main-parameter">
									<text class="score"><text class="iconfont icon-xing"></text>4.4</text>
									<text class="serviceunm">享受服务：10次</text>
								</view>
							</view>
						</view>
						<view class="central-section">
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>我现需要：一罐5kg煤气</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务时间：3月11日</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务地点：广东省深圳市龙岗区志联佳大厦508号</text>
							</view>
						</view>
						<view class="lower-part">
							<text>2018年10月15日 15:30</text>
							<view class="buts">
								<view class="theme-button-inverse">联系TA</view>															
								<view class="theme-button">立即抢单</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="upper-part">
							<image class="item-img" src="../../static/logo.png" alt=""></image>
							<view class="main-left">
								<view class="main-title">
									<text class="tit">就凉快 <text class="iconfont icon-xing"></text></text>
									<text class="distance">1.6km</text>
									
								</view>
								<view class="main-parameter">
									<text class="score"><text class="iconfont icon-xing"></text>4.4</text>
									<text class="serviceunm">享受服务：10次</text>
								</view>
							</view>
						</view>
						<view class="central-section">
							<view class="it">
								<text class="iconfont icon-wenzhang2"></text><text>我现需要：一罐5kg煤气</text>
							</view>
							<view class="it">
								<text class="iconfont icon-shijian"></text><text>服务时间：3月11日</text>
							</view>
							<view class="it">
								<text class="iconfont icon-dingwei"></text><text>服务地点：广东省深圳市龙岗区志联佳大厦508号</text>
							</view>
						</view>
						<view class="lower-part">
							<text>2018年10月15日 15:30</text>
							<view class="buts">
								<view class="theme-button-inverse">联系TA</view>															
								<view class="theme-button">立即抢单</view>
							</view>
						</view>
					</view>
			
				</view>
			
			</view>
			
		</view>
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		 <uni-load-more :status="loadingType"></uni-load-more>
	</view>
	
</template>

<script>
	import tool from "@/common/common.js"
	import bmap from '@/common/SDK/bmap-wx.js';
	import {IndexModel} from '@/common/models/index.js'
	let indexModel = new IndexModel()
	import {HouseModel} from '@/common/models/house.js'
	let housemodel = new HouseModel()
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import store from '@/store/index.js'
	import {mapState} from 'vuex'

	export default {
		components: {
			mpvueCityPicker,
			uniLoadMore
		},
		data() {
			return {
				loadingType:"loading",
				city:'',
				isActive:false, // 滚动吸顶
				chenck:true,   //tab切换
				//地址参数
				second:true,
				cityPickerValueDefault: [0, 0, 1],
				themeColor:"#FF6600",
				pickerText:'北京',
				swiperCurrent: 0, 
				listlf:[],
				listrt:[],
				pagelfunm:1,
				pagertunm:1,
				Iconslist:[],
				Swiperlist:[],
				Otherlistone:'',
				Otherlisttwo:[{coverImg:""},{coverImg:""},{coverImg:""}],
				Otherlistthree:[]
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		onLoad() {
			console.log();
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
			//#ifdef MP
			this.BMap = new bmap.BMapWX({
			           ak: 'nsFKMwl7mT7b6Actb465GqRu65v7LBSX' 
			});
			this.BMap.regeocoding({ 
			            success: data => {
			            	console.log(data)
			            	this.pickerText = data.originalData.result.addressComponent.city.replace(/市/g, ''); //把"市"去掉
										}
			});
			//#endif
	
		},
		onShow(){
			// #ifndef H5
	// 		uni.getSetting({
	// 			success(res) {
	// 				if (res.authSetting['scope.userInfo']){
	
	// 				}else{
	// 					uni.navigateTo({
	// 						url: '/pages/login/getUserinfo' //跳转到授权页面
	// 					})
	// 				}
	// 			}
	// 		})
			// #endif
		},
		onReady(){
			this.loadData()					
		},
		methods: {
			toSelectFixed(){
				uni.navigateTo({
					url: '/pages/index/fixed/select_fixed'
				})
			},
			toMessage(){
				uni.navigateTo({
					url: '/pages/msg/msg'
				})
			},
			toUserInfo(){
				// #ifdef H5
				uni.navigateTo({
					url: "/pages/login/login"
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: "/pages/login/getUserinfo"
				})
				// #endif
			},			
			 loadData(){
				 indexModel.getIcons((data)=>{//分类导航
					this.Iconslist = data;
					// for(let i=0;i<data.length;i++){
					// 	if(i==0 || i==1 || i==3 || i==5 || i==6){
							
					// 	}else{
					// 		this.Iconslist.push(data[i])
					// 	}
					// }
				})
				 indexModel.getSwiper((data)=>{ // 首页轮播图
					this.Swiperlist=data
					// for(let i=0;i<data.length;i++){
					// 	if(i==0 || i==3 || i==11){
					// 		this.Swiperlist.push(data[i])
					// 	}
					// }
				})
				 indexModel.getOther((data)=>{
					this.Otherlistone=data[0].advertList
					this.Otherlisttwo=data[1].advertList
					this.Otherlistthree=data[2].advertList
					// for(let i=0;i<data[2].advertList.length;i++){
					// 	if(i==0 || i==3){
					// 		this.Otherlistthree.push(data[2].advertList[i])
					// 	}
					// }
				})
			},
			Jump (num) {
				// if(num==1){
				// 	uni.navigateTo({
				// 		url: '/pages/provide/index?type=' + 3
				// 	})
				// }else if(num==2){
				// 	if(!this.hasLogin){
				// 		uni.navigateTo({
				// 			url:'/pages/login/getUserinfo'
				// 		})
				// 	}else{
				// 		uni.navigateTo({
				// 			url:'/pages/user/attendance/attendance'
				// 		})
				// 	}
				// }else if(num==3){
				// 	uni.navigateTo({
				// 		url: '/pages/VIPCard/VIPCard'
				// 	})
				// }else if(num==4){
				// 	uni.navigateTo({
				// 		url: '/pages/user/collection/collection'
				// 	})
				// }else if(num==5){
				// 	uni.navigateTo({
				// 		url: '/pages/wallet/coupon'
				// 	})
				// }
				
				if(num==1){
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 8
					})
				}else if(num==3){
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 3
					})
				}else if(num==7){
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 9
					})
				}
				else if(num==2){
					uni.navigateTo({
						url: '/pages/provide/index?type=' + 10
					})
				}else if(num==6){
					uni.navigateTo({
						url:'/pages/house/house'
					})
				}else if(num==4){
					uni.navigateTo({
						url:'/pages/finance/finance'
					})
				}else if(num==8){
					uni.navigateTo({
						url:'/pages/VIPCard/VIPCard'
					})
				}else if(num==5){
					if(!this.hasLogin){
						// #ifdef H5
						uni.navigateTo({
							url: "/pages/login/login"
						})
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url: "/pages/login/getUserinfo"
						})
						// #endif
					}else{
						uni.navigateTo({
							url:'/pages/user/attendance/attendance'
						})
					}
				}else if(num==9){
					uni.navigateTo({
						url:'/pages/user/collection/collection'
					})
				}else if(num==10){
					uni.navigateTo({
						url:'/pages/wallet/coupon'
					})
				}
				
			},
			changeSwiper(e) {
			    this.swiperCurrent = e.detail.current;
			},
			clicksearch () {
				uni.navigateTo({
					url: '../HM-search/HM-search'
				});
			},	
			 getprovide (pagelfunm){
				  // housemodel.getHouseSecondType({firstType:'家政',type:2},(data)=>{
					 //  if(data.length==0){
						//  this.loadingType="noMore"
					 //  }
					 //  this.listlf=this.listlf.concat(data)
				  // })
				  indexModel.getLatest(pagelfunm,(data)=>{
					  console.log(data.length)
					 if(data.length==0){
						 this.loadingType="noMore"
					 }
				     this.listlf=this.listlf.concat(data)
				    })
			},
			//商品跳转
			toGoods(item) {
				uni.navigateTo({
					url: '/pages/provide/detail?id=' + item.id + '&type=' + 8 + '&sellerId=' + item.sellerId
				});
			},
			onCancel(e) {
				console.log(e)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) { 
				let city=e.label.split("-")
				this.pickerText=city[1]
				console.log(e)
			},
			provide:function(e){
				this.chenck=!this.chenck
			},
			provided:function(e){
				this.chenck=!this.chenck
			},
			onPageScroll:tool.debounce(function(res){
				this.isActive=res[0].scrollTop>970 ? true :false		
			}),
			onHide:function(){
				
			}
		},

		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom:tool.debounce(function(){
				this.pagelfunm++
				this.getprovide (this.pagelfunm)
		}),
		onBackPress() { //监听页面返回
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		onUnload() {  //监听页面卸载
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}	
	}
</script>

<style lang="scss">
	//ctrl+alt+/ 即可生成正确注释 条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 // 注释、css 使用 /* 注释 */、vue/nvue 模板里使用 <!-- 注释 -->；
		page{
			background:#fff;	
		}		
		.bg{height: 20rpx;background:rgba(246,246,246,1);}
		
		.getuser_box{
			position: fixed;
			left: 0;
			bottom: 0;
			/* #ifdef H5 */
			bottom: 50px;
			/* #endif */
			width: 100%;
			background: rgba(0,0,0,.5);
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			font-size: 26rpx;
			box-sizing: border-box;
			z-index: 50;
			button{
				display: inline-block;
				color: #fff;
				background: #FF9801;
				font-size: 26rpx;
				padding: 10rpx 15rpx;
				box-sizing: border-box;
				line-height: 1.2;
			}
		}
		
		.title{
			display: flex;
			align-items: center;
			height: 90rpx;		
			.mark{
				width: 8rpx;
				height: 30rpx;
				background-color: #FF6600;
				margin-right: 30rpx;
			}
			text{
				font-size:32rpx;
				font-weight:500;
				color:rgba(60,60,60,1);
			}
		}
		.top_fixed{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			background: #fff;
			height: 88rpx;
			z-index: 1000;
			padding:12rpx 20rpx;
			padding-bottom: 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				display: block;
				width: 30rpx;
				height: 36rpx;
			}
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 54%;
				text{
					display: block;
					width: 80%;
					color: #1E1E1E;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 26rpx;
					height: 31rpx;
					margin-right: 10rpx;
				}
			}
		}
		.top{
			position: fixed;
			top: 88rpx;
			left: 0;
			right: 0;
			z-index: 1000;
			display: flex;
			align-items: center;
			height: 88rpx;
			padding:12rpx 20rpx;
			padding-top: 0;
			box-sizing: border-box;
			background-color: #FFFFFF;
			.top-Location{
				min-width: 82rpx;
				color: #646464;
				display: flex;
				align-items: center;
				font-size:26rpx;
				.drop-down{
					width: 14rpx;
					height: 8rpx;
					margin:0 36rpx 0 18rpx;
				}
			}
			.top-search{
				flex: 1;
				height: 64rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color:#F6F6F6 ;
				padding:0 20rpx;
				.lf{
					width: 28rpx;
					height: 28rpx;
					
				}
				.rt{
					width: 20rpx;
					height: 30rpx;
				}
				text{
					font-size: 24rpx;
					color:#B4B4B4;
					padding-left: 10rpx;
				}	
			}
			
		}
		.place{height: 176rpx;}// height: 232rpx;
		.carousel-section{
			width: 100%;
			height: 33.3vw;
			overflow: hidden;
			position: relative;
			swiper{
				width: 100%;
				height: 33.3vw;
				position: relative;
				swiper-item{
					.swiper-img{
						width: 100%;
						height: 33.3vw;
					}
				}
			}
			.dots {
			          position: absolute;
			          bottom: 20rpx;
			          left: 50%;
			          // 这里一定要注意兼容不然很可能踩坑          
			          transform: translate(-50%, 0);
			          -webkit-transform: translate(-50%, 0);        
			          z-index: 99;
			          display: flex;
			          flex-direction: row;
			          justify-content: center;			
			          .dot {
			              width: 8rpx;
			              height: 8rpx;
			              transition: all .6s;
			              background: rgba(0, 0, 0, .3);
			              margin-right: 10rpx;
			          }			
			          .active {
			              width: 8rpx;
			              height: 8rpx;
			              background: rgba(255, 255, 255, .8);
			          }
			     }
		}
		.icons{
			width: 100%;
			height: 336rpx;
			background: #fff;
			// height: 168rpx;
			margin-top: 43rpx;
			display: flex;
			flex-wrap: wrap;
			margin-bottom:20rpx;
			.item{
				width: 20%;	
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 40rpx;			
				image{
					width: 100rpx;
					height: 82rpx;
				}
				text{
					font-size: 26rpx;
				}
			}
		}
		.life-box{
			height: 620rpx;
			padding: 0 20rpx;
			.life-cen{	
				display: flex;
				justify-content: space-between;
				.lf{				
					image{
						width:444rpx;
						height:290rpx;
						border-radius:8rpx;
					}
				}
				.rt{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					image{
						width:249rpx;
						height:140rpx;
						border-radius:8rpx;
					}
				}
			}
			.life-bottom{
				display: flex;
				justify-content: space-between;
				margin:10rpx 0 30rpx 0;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					width:170rpx;
					height:200rpx;
					background:rgba(247,247,247,1);
					border-radius:8px;
					image{
						width:170rpx;
						height:200rpx;
					}
				}
			}
		}
		.Other-box{
			margin:10rpx 0;
			padding:0 20rpx;
			.item-img{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 10rpx;
				image{
					width:350rpx;
					height:200rpx;
					border-radius:8rpx;
					margin-top: 10rpx;
				}
			}
		}
		.tabs{
			display: flex;
			justify-content: space-around;
			height:80rpx;
			background-color:#FFFFFF;
			&.activeClass{position: fixed;top:44px;left: 0;right: 0;z-index: 1000;}
			.item{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #646464;
				text{
					font-size:30rpx;
					font-weight:400;					
					padding:25rpx 0 26rpx 0;
					&.checkclass{color:rgba(255,102,0,1);}
				}
				view{
					width:80rpx;
					height:6rpx;
					border-radius:3px;
					margin-top: -20rpx;
					&.checkclassbg{background:rgba(255,102,0,1);}
				}
				
			}
		}
		.list{	
			background:rgba(246,246,246,1);	
			.list-lf{
				margin:10rpx 0;
				.item{
					height: 220rpx;
					padding: 30rpx 20rpx;
					display: flex;
					margin:10rpx 0;
					background:#FFFFFF;	
					.item-img{
						width: 160rpx;
						height: 160rpx;
						background:rgba(250,250,250,1);
						border-radius:10rpx;
						margin-right: 20rpx;
					}
					.main-left{
						width: 520rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;	
						.main-title{
							display: flex;
							justify-content: space-between;						
							.tit{
								max-height: 80rpx;
								overflow: hidden;
								font-weight:400;
								line-height:40rpx;						
								flex: 1;
							}
							.distance{
								font-size:24rpx;
								color:rgba(120,120,120,1);
							}
						}
						.main-parameter{
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							.fh{
								color: #FF6600;	
								font-size: 34rpx;
								color:rgba(160,160,160,1);
							}
							.price{
								font-size:34rpx;
								color: #FF6600;								
							}
							.volume{
								font-size:22rpx;					
								color:rgba(180,180,180,1);								
							}
							image{
								width: 56rpx;
								height: 56rpx;
							}
						}
					}
				}
			}
			.list-rt{
				margin:10rpx 0;
				.item{
					height: 436rpx;
					padding: 40rpx 20rpx 30rpx;
					margin:10rpx 0;
					background-color: #fff;
					.upper-part{
						display: flex;
						image{
							width:88rpx;
							height:88rpx;
							border-radius:10rpx;
							margin-right: 20rpx;
						}
						.main-left{
								width: 590rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;	
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
									.distance{
										font-size:24rpx;
										color:rgba(120,120,120,1);
									}
								}
								.main-parameter{							
									.score{									
										font-weight:400;
										color:$theme-text-color;
										text{
											margin-right:10rpx;
										}
									}
									.serviceunm{
										margin-left:20rpx;
										font-size:24rpx;
										color:rgba(120,120,120,1);
										font-weight:400;
										
									}						
								}
							}
						
					}
					.central-section{
						height:157rpx;
						background:rgba(250,250,250,1);
						margin:30rpx 0;
						.it{						
							padding:10rpx 0 10rpx 10rpx;
							.iconfont{
								color:#FFAF7A;
								margin-right: 30rpx;
							}
						}
					}
					.lower-part{
						justify-content: space-between;
						align-items: center;
						display: flex;
						text{
							font-size:24rpx;
							font-weight:400;
							color:rgba(160,160,160,1);
						}
						.buts{
							display: flex;
							view{
								width:160rpx;
								height:60rpx;
							}
							.theme-button{
								margin-left: 28rpx;
							}
						}
						
					}
				}
			}
			
		}
</style>		
