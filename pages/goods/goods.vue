<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon iconfont icon-jiantou-copy" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box">
					<view class="icon iconfont icon-fenxiang"></view>
					<button class="text" open-type="share">分享</button>
					
				</view>
				<view class="box" @tap="toChat">
					<view class="icon iconfont icon-duanxin"></view>
					<view class="text">客服</view>
				</view>
				<view class="box">	
					<like class="icon" :isKeep=like @like="keep"></like>
					<view class="text">{{like?'已':''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="screenOne('bottom',2)">加入购物车</view>
				<view class="buy" @tap="screenOne('bottom',3)">立即购买</view>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<uni-popup ref="popup" :type="type"  @change="change">
			<view class="Specifications-popup">
				<view class="information-box">
					<image :src="itemList[0].image" mode=""></image>
					<view class="rt">						
						<view>
							<text>￥50</text>
							<view>配送至：龙岗区</view>
							<view>请选择属性</view>
						</view>
					</view>
				</view>
				<view class="title">选择规格：</view>
				<view class="sp">
					<view v-for="(item,index) in itemList" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index,item)" :key="index">{{item.title}}</view>
				</view>
				<view class="length">
					<view class="text">数量</view>
					<view class="number">
						<view class="sub" @tap.stop="sub">
							<view class="icon iconfont icon-jia"></view>
						</view>
						<view class="input" @tap.stop="discard">
							<input type="number" v-model="number" />
						</view>
						<view class="add"  @tap.stop="add">
							<view class="icon iconfont icon-jian"></view>
						</view>
					</view>
				</view>
				<view class="btn">					
						<view v-if="btnitem == 1" class="joinCart" @click="joinCart()">加入购物车</view>
						<view v-if="btnitem == 1" class="buy" @click="buy()">立即购买</view>
				</view>
				<view v-if="btnitem == 2" class="theme-button" @click="joinCart()">加入购物车</view>
				<view v-if="btnitem == 3" class="theme-button" @click="buy()">立即购买</view>
			</view>			
		</uni-popup>

		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥<text class="prilf">{{goodsData.price}}</text><text class="prirt">原价{{goodsData.normalPrice}}元</text></view>
			<view class="title">
				{{goodsData.goodsName}}
			</view>
			<view class="volume">
				<text>配送费￥{{goodsData.postFee}}</text>
				<text>月销{{goodsData.monthSale}}</text>
				<text>距离{{goodsData.serviceScope}}km</text>
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row"  @click="screenOne('bottom',1)">
				<view class="text">规格</view>
				<view class="content">
					<!-- <view>选择规格：</view> -->
					<view class="sp">
						<view>{{selecttitle}}</view>
					</view>
					
				</view>
				<view class="arrow"><view class="icon iconfont icon-dibudaohanglan-"></view></view>
			</view>
		</view>
		<!-- 评价 -->
<!-- 		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon iconfont icon-dibudaohanglan-"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 店铺信息 -->
		<view class="shop-box">
			<image :src="shopData.logoPic" mode=""></image>
			<view class="rt">
				<view class="title"><text>{{shopData.nickName}}</text></view>
				<view class="main">
					<view><text class="iconfont icon-xing"></text><text class="iconfont icon-xing"></text>{{shopData.mainScore}}</view>
					<view @click="topshop"><text>进店看看</text><text class="iconfont icon-dibudaohanglan-"></text></view>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<!-- <view v-for="(item,index) in goodsDesc"><image width="100%" :src="item.url" mode=""></image></view> -->
			<view class="content"><rich-text :nodes="descriptionStr"></rich-text></view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {GoodsModel} from '@/common/models/goods.js'
	let goodsModel=new GoodsModel()
	import {LikeModel} from '@/common/models/like.js'
	let Likemodel=new LikeModel()
	import like from "@/components/like.vue"
export default {
	components:{
		uniPopup,
		like
	},
	data() {
		return {
			btnitem:null, //购物车，下单按钮切换
			type:'',//底部popup
			goodsId:null,
			number:1,
			selecttitle:"请选择",
			difference:null,
			like:false,//收藏
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			],//导航条锚点
			selectAnchor:0,//选中锚点
			shopData:null,
			// 商品信息
			goodsData:{
				// id:1,
				// name:"清风原木纸巾三层360抽 买三送一 限时抢购 两天后恢复原价",
				// price:"127.00",
				// number:1,
				// service:[
				// 	{name:"正品保证",description:"此商品官方保证为正品"},
				// 	{name:"极速退款",description:"此商品享受退货极速退款服务"},
				// 	{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				// ],
				// spec:["XS","S","M","L","XL","XXL"],
				// comment:{
				// 	number:102,
				// 	userface:'../../static/img/face.jpg',
				// 	username:'大黑哥',
				// 	content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				// }
			},
			itemList:null,
			selectSpec:null,//选中规格
			//商品描述html
			goodsDesc:null,
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
		};
	},
	onShareAppMessage(res) {
	      return {
	        title: '微信小程序测试分享',
	        path: '/pages/index/index'
	      }
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		console.log(option); //打印出上个页面传递的参数。
		this.goodsId=option.id
		
	},
	onReady(){
		this.goods(this.goodsId)
	},
	methods: {
		
		//收藏
		keep(letter){
			console.log(letter)
			Likemodel.like(this.goodsId,letter,(data)=>{
				this.like=letter
			})
		},
		async goods(id){
			goodsModel.getDetails(id,(data)=>{
				
				console.log(data)
				this.goodsData=data.goods
				this.swiperList.push(this.goodsData.smallPic)
				this.itemList=data.itemList
				goodsModel.findOneDetailed({sellerId:data.goods.sellerId},(res)=>{
					this.shopData=res
				})
				this.goodsDesc=JSON.parse(data.goodsDesc.itemImages)
				this.descriptionStr=`<div style="text-align:center;">`
				for(let i=0;i<this.goodsDesc.length;i++){
					this.descriptionStr+=`<img width="100%" src="${this.goodsDesc[i].url}"/>`
				}
				this.descriptionStr+=`<div>`
				this.like=data.goods.isCollect ? true :false
				this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
			})
			goodsModel.getComment(id,(data)=>{
				
			})
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../msg/msg'
			})
		},
		// 客服
		toChat(){
			uni.navigateTo({
				url:"../msg/chat/chat?name=客服008"
			})
		},
		
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings'
			})
		},
		topshop(){
			uni.navigateTo({
				url:'../shop/shop?sellerId='+this.shopData.sellerId
			})
		},
		//跳转评论列表
		showComments(goodsid){
			
		},
		//选择规格
		setSelectSpec(index,item){
			this.goodsItemId=item.goodsItemId
			this.selecttitle=item.title
			this.selectSpec = index;
			
		},
		//减少数量
		sub(){
			if(this.number<=1){
				return;
			}
			this.number--;
		},
		//增加数量
		add(){
			this.number++;
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			console.log(index,this.anchorlist[index].top);
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			// this.anchorlist=[]
			let commentsView = uni.createSelectorQuery().in(this).select("#comments");
			commentsView.boundingClientRect((data) => {
				console.log(data);
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				console.log(this.anchorlist[1].top);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				// console.log(this.anchorlist[1].top,this.anchorlist[2].top);
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		screenOne (type,btnitem) {
			this.btnitem=btnitem
			this.type = type
			this.$refs["popup"].open()
		},
		change(e) {
			console.log(e.show)
		},
		//加入购物车
		joinCart(){
			if(this.selectSpec==null){
				this.$api.msg("请选择规格");
				return
			}
			
			let obj={goodsItemId:this.goodsItemId,num:this.number}
			goodsModel.getCart(obj,(data)=>{
				this.$refs["popup"].close()
				this.$api.msg("已加入购物车");
			})
			
	
		},
		//立即购买
		buy(){
			if(this.selectSpec==null){
				this.$api.msg("请选择规格");
				return
			}
			let obj={goodsItemId:this.goodsItemId,num:this.number}
			goodsModel.oneTotal(obj,(data)=>{
				uni.navigateTo({
					url:'../order/confirmation?type=0&data=' + JSON.stringify(data)
				})
			})
			
	
		}
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({ title: '触发上拉加载' });
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 100%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.back {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42upx;
			}
		}
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5upx;
				}
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 67vw;
	swiper {
		width: 100%;
		height: 67vw;
		swiper-item {
			image {
				width: 100%;
				height: 67vw;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	width: 100%;
	padding: 26upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.goods-info {
	color:rgba(200,200,200,1);
	.price {	
		line-height:36upx;
		.prilf{
			font-size: 46upx;
			font-weight: 600;
			color: $theme-text-color;
			margin-right: 59upx;
		}
		.prirt{
			font-size:24upx;
			font-weight:400;
			text-decoration:line-through;
		}
	}
	.title {
		margin: 30upx 0 40upx 0;
		font-size:30upx;
		font-weight:500;
		color:rgba(60,60,60,1);
		line-height:40upx;
	}
	.volume{
		display: flex;
		justify-content: space-between;
		font-size:24upx;
		font-weight:400;		
		line-height:36upx;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {		
					padding: 5upx 10upx;				
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				font-size: 48upx;
				color: #ccc;
			}
		}
	}
}
.comments {
	.row {
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 30upx;
		}
		.arrow {
			font-size: 28upx;
			position: absolute;
			right: 4%;
			color: #17e6a1;
			.show {
				display: flex;
				align-items: center;
				color: $theme-text-color;
				.icon {
					color:$theme-text-color;
				}
			}
		}
	}
	.comment {
		width: 100%;
		.user-info {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			.face {
				width: 40upx;
				height: 40upx;
				margin-right: 8upx;
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 100%;
				}
			}
			.username {
				font-size: 24upx;
				color: #999;
			}
		}
		.content {
			margin-top: 10upx;
			font-size: 26upx;
		}
	}
}
.shop-box{
	background-color: #FFF;
	height: 160upx;
	padding:30upx 20upx;
	display: flex;
	image{
		width:100upx;
		height:100upx;
		border-radius:10upx;
		margin-right: 22upx;
	}
	.rt{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title{
			font-size:34upx;
			font-weight:500;
			color:rgba(60,60,60,1);
		}
		.main{
			display: flex;
			justify-content: space-between;			
			align-items: center;
			color: $theme-text-color;
			view{
				&:first-child{
					text{
						margin-right: 10upx;
					}
				}
			}
				
		}
	}
}
.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 100%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 86upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;			
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
			button{margin-top: -12rpx;}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			//background-color: #f0b46c;
			background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
		}
		.buy {
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			//background-color: #f06c7a;
		}
	}
}

.Specifications-popup {
   width: 100%;
   .information-box{
		display: flex;
		image{
			 width:200upx;
			 height:200upx;
			 border-radius:10upx;
			 margin-right: 20upx;
		}
		.rt{
			 display: flex;
			 align-items: flex-end;
			 text{
				  font-size: 28upx;
				  color:$theme-text-color;
				  line-height:36upx;
				  font-weight:500;
			 }
			 view{
				  line-height:36upx;
				  font-size:24upx;
				  color:rgba(160,160,160,1);
			 }
		}
   }
   .title {
   	font-size: 30upx;
   	margin: 30upx 0;
   }
   .sp {
   	display: flex;
   	view {
   		padding: 14upx 18upx;
   		border-radius: 8upx;
   		border:1upx solid rgba(180,180,180,1);
   		margin: 0 30upx 20upx 0;
   		&.on {	
   			border: 1upx solid $theme-text-color;
   			color: $theme-text-color;
   		}
   	}
   }
   .length{
		margin-top: 30upx;
		border-top: solid 1upx #aaa;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40upx 0;
		.text{
			font-size: 30upx;
		}
		.number{
			display: flex;
			justify-content: center;
			align-items: center;
			.input{
				width: 80upx;
				height: 60upx;
				margin: 0 10upx;
				border:1px solid rgba(180,180,180,1);
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				input{
					width: 80upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					font-size: 26upx;
				}
			}
			
			.sub ,.add{
				width: 60upx;
				height: 60upx;
				border:1px solid rgba(180,180,180,1);
				border-radius: 5upx;
				.icon{
					font-size: 30upx;
					color: rgba(180,180,180,1);
					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					
				}
			}
		}
   }
   .btn {
	    width: 100%;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			flex: 1;
			height: 80upx;
			padding: 0 100upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			//background-color: #f0b46c;
			background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
		}
		.buy {
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			//background-color: #f06c7a;
		}
   }
   .theme-button{
	   height: 80upx;
	   line-height: 80rpx;
   }
  }


</style>
