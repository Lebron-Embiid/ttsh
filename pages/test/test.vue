<template>
	<view v-if="!hasLogin" class="hasLogin">
		
			<view>
				<image src="../../static/notlogged.png" mode=""></image>
			</view>
			<view class="title">
				<text>登录后可查看“我的”页面</text>
			</view>
			<view class="theme-button" @tap="navToLogin"><text>立即登录</text></view>
		
		
	</view>
	<view v-else>

		<view class="shopping-list" v-if="tabbarIndex==0">
			<view class="nogoods" v-if="shopingCarlist.length==0">
				<image class="noShopping" src="../../static/cut/shoppingcar.png"></image>
				<view class="text">
					{{shoppingNone}}
				</view>
			</view>
			<view class="row" v-for="(row,number) in shopingCarlist" :key="number">
				<view class="container">
					
					<view class="storeInfo">
						<view class="checkbox" @tap="shopChoose(row)">
							<image v-if="row.select==0" src="../../static/cut/no_selected.png"></image>
							<image v-if="row.select==1" src="../../static/cut/selected.png"></image>
						</view>
						<image class="storeIcon" src="../../static/cut/dpicon.png"></image>
						<view class="storeTitle">{{row.sellerName}}</view>
					</view>
					
					
					<view class="goodsInfo" v-for="(good,index) in row.orderItemList" :key="index">
						
						<view class="menu" @tap="deleteItem(good,index)">
							<view class="icon iconfont icon-iconfontshanchu1"></view>
						</view>
						
						<view class="carrier" :class="[theIndex==index&&theNumber==number?'open':oldIndex==index&&oldNumber==number?'close':'']" @touchstart="touchStart(index,number,$event)" @touchmove="touchMove(index,number,$event)" @touchend="touchEnd(index,number,$event)">
							<view class="checkbox" @tap="goodChoose(row,good)">
								<image v-if="good.selected == false" src="../../static/cut/no_selected.png"></image>
								<image v-if="good.selected == true" src="../../static/cut/selected.png"></image>
								
							</view>
							<view class="storeImage"><image :src="good.picPath"></image></view>
							<view class="detail">
								<view class="title">{{good.title.substring(0,42)}}</view>
								<view class="spec">{{good.spec|jsonparse}}</view>
								<view class="choose">
									<view class="price">￥{{good.price}}</view>
									<view class="number">
										<view class="sub">
											<image src="../../static/cut/sub_click.png" @tap.stop="sub(good)"></image>
										</view>
										<view class="input">
											<input type="number" v-model="good.num"/>
										</view>
										<view class="add">
											<image src="../../static/cut/add_click.png" @tap.stop="add(good)"></image>
										</view>
									</view>
								</view>
							</view>
						</view>	
					</view>
				</view>
			</view>
			
			<view class="footer" v-if="shopingCarlist.length!=0">
				<view class="checkbox" @tap="allChoose()">
					<image v-if="allSelected==0" src="../../static/cut/no_selected.png"></image>
					<image v-if="allSelected==1" src="../../static/cut/selected.png"></image>
					<view class="all">全选</view>
				</view>
				<view v-if="isAccounted==0" class="left">
					<view class="manage" @tap="tab()">管理</view>
					<view class="totalTitle">合计：<text>￥{{sumPrice.toFixed(2)}}</text></view>
					<view class="button" @tap="settlement">结算</view>
				</view>
				<view v-if="isAccounted==1" class="right">
					<view class="acomplish" @tap="tab()">完成</view>
					<view class="moveButton">移至收藏</view>
					<view class="button" @tap="deleteList">删除</view>
				</view>
						
			</view>
		</view>
		
		<view class="whatInfo">
			<view class="information">
				<view class="titlee">姓名</view>
				<view class="contente">欧阳华</view>
			</view>
			<view class="information">
				<view class="titlee">房屋</view>
				<view class="contente">龙城广场A出口 电梯公寓直租</view>
			</view>
			<view class="information">
				<view class="titlee">证件</view>
				<view class="contente">5462105644564564</view>
			</view>
		</view>
		
		<view class="confirm">
			<view class="tips">
				<view class="star">房屋合同事项确认</view>
				<image :src="[isContract?src[1]:src[0]]" @tap="conformToast"></image>
			</view>
			<view class="gray">请仔细阅读并确认租聘合同事项哦~<text @tap="toContract">点击查看合同</text></view>
		</view>
		
		<view class="timepicker">
			<view class="star title">租期时长</view>
			<view class="choose">
				<view class="startDate">
					<picker mode="date" :start="startday" @change="startdateChange">
						<view>{{startDate}}</view>
					</picker>
				</view>
				<view>至</view>
				<view class="endDate">
					<picker mode="date" :start="endday" @change="enddateChange">
						<view>{{endDate}}</view>
					</picker>
				</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view class="payType">
			<view class="star title">付款方式</view>
			<view class="content" @tap="choosePay">
				<view class="way">{{payType}}</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		
		
		<view class="order-list" v-if="tabbarIndex!=0">
			<view class="noOrder" v-if="list.length==0">
				<image class="noShopping" src="../../static/cut/noorder.png"></image>
				<view class="text">
					{{orderNone}}
				</view>
			</view>
			
			<block class="list" v-for="(item,index) in list" :key="index">
				
				<view v-if="item.firsttypeId == 8||item.firsttypeId==9" class="type" @tap="toDetail(item)">
					<store-title :title="item.sellerNickName" :status="item.type"></store-title>
					<block v-for="(row,number) in item.goodsOrderItemList" :key="number">
						<store-main :pic="row.picPath" :title="row.title" :price="'￥'+row.price"
						:specsize="JSON.parse(row.spec).spec" :spec="'×' + row.num"></store-main>
					</block>
					<view class="deliverMoney">
						<view class="deliverTitle">配送费</view>
						<view class="money">￥{{item.postFee}}</view>
					</view>
					<view class="total">合计:￥{{item.payment}}</view>
					<store-time :time="item.createTime" :type="item.type" v-on:rating="goRating(item)" v-on:confirmOrder="confirmOrderOk(item)" v-on:backOrder="applyService(item)"></store-time>
				</view>
				
				<view v-if="item.firsttypeId==1" class="type" @tap="toDetail(item)">
					<store-title :title="item.nickName" :status="item.type"></store-title>
					<store-main :pic="item.picture" :title="item.title" :specsize="item.paymentMethod">
						<view class="fee">
							<view class="feename">押金</view>
							<view class="feenum">￥{{item.deposit}}</view>
						</view>
						<view class="fee">
							<view class="feename">租金</view>
							<view class="feenum">￥{{item.rental}}</view>
						</view>
						<view class="fee">
							<view class="feename">服务费</view>
							<view class="feenum">￥{{item.serviceCharge}}</view>
						</view>
					</store-main>
					<view class="sum">合计:￥{{item.sum}}</view>
				</view>
			</block>
		</view>
		<view class="submit-button">确认支付￥2000</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {OrderModel} from '@/common/models/order.js'
	import storeTitle from '@/components/orderbox/store-title.vue'
	import storeMain from '@/components/orderbox/store-main.vue'
	import storeTime from '@/components/orderbox/store-time.vue'
	let ordermodel = new OrderModel()
	export default{
		components:{
			storeTitle,
			storeMain,
			storeTime
		},
		filters: {
			jsonparse: function(value) {
				return JSON.parse(value).spec;
			}
		},
		data(){
			return{
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['购物车','待付款','进行中','待评价','退款售后'],
				orderNone:"暂无订单哦，去首页逛逛吧",
				shoppingNone:"暂无商品哦，去首页逛逛吧",
				tabbarIndex:1,
				allSelected:false,
				shopSelected:0,
				startDate:'请选择开始日期',
				endDate:'请选择结束日期',
				list:[
					{
						firsttypeId:1,
						nickName:'糖宝数码',
						title:'龙城广场A出口 电梯公寓直租',
						type:'',
						paymentMethod:'月付',
						picture:'http://img.zx123.cn/Resources/zx123cn/uploadfile/2019/0522/thumb_288_20190522085314_89034.jpg',
						deposit:1000,
						rental:1000,
						serviceCharge:0,
						sum:2000,
						createDate:'2019-11-01 15：46：55',
						
					}
				],
				theIndex:null,
				oldIndex:null,
				theNumber:null,
				oldNumber:null,
				isStop:false,
				sumPrice:0,
				isAccounted:0,
				goodslist:[
					{type:"choose", img: '/static/goods/p1.jpg', name: '清风原木纯品纸巾三层360抽 买三送一 限时抢购', price: '168.00',payment:168.00,spec:'规格:S码',number:'' ,store:'清风纸巾售卖店'},
					{type:"choose", img: '/static/goods/p1.jpg', name: '清风原木纯品纸巾三层360抽 买三送一 限时抢购', price: '168.00',payment:168.00,spec:'规格:S码',number:'' ,store:'清风纸巾售卖店'}
				],
				typeText:{
					unpaid:'等待买家付款',
					unreceived:'等待商家接单',
					received:'商家已接单',
					deliver:'发货中',
					completed:'交易完成',
					refunds:'退款中',
					cancelled:'退款成功',
					serviced:'商家处理中',
					payType:'季付'
				},
				shopingCarlist:{},
			}
		},
		onLoad: function (option) {
			this.tabbarIndex = option.index
			console.log(option.index)
			//兼容H5下排序栏位置
			// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			

		},
		onShow:function(){
			ordermodel.getCartList((data)=>{
				this.allSelected = false
				this.sumPrice = 0
				this.shopSelected = 0
				this.shopingCarlist = data
			})
		},

		computed:{
			...mapState(['hasLogin'])
		},
		methods:{
			navToLogin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
			},
			//控制左滑删除效果-begin
			touchStart(index,number,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.oldNumber = this.oldNumber;
				this.theIndex = null;
				this.theNumber = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,number,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}
				
				if(moveX<0){
					this.theIndex = index;
					this.theNumber = number;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex&&this.theNumber!=null&&this.oldNumber==this.theNumber){
						this.oldIndex = index;
						this.oldNumber = number;
						this.theIndex = null;
						this.theNumber = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
							this.oldNumber = null;
						},150)
					}
				}
			},
			touchEnd(index,number,$event){
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end
			
			goRating(item){
				if(item.firsttypeId == 8){
					let data = {}
					data.spec = JSON.parse(item.goodsOrderItemList[0].spec).spec
					data.image = item.goodsOrderItemList[0].picPath
					data.title = item.goodsOrderItemList[0].title
					data.goodsId = item.goodsOrderItemList[0].goodsId
					data.goodsOrderId = item.orderId
					uni.navigateTo({
						url:'comment?data=' + JSON.stringify(data)
					})
				}
				
			},
			orderDetail(){
				uni.navigateTo({
					url:'orderdetail'
				})
			},
			chooseTrue(row,good){
				good.selected = true;
				++row.choose === row.orderItemList.length?row.select = true : '';
				row.select ? ++this.shopSelected === this.shopingCarlist.length? this.allSelected = true : this.allSelected = false : ''
				this.sumPrice += good.num * good.price
			},
			chooseFalse(row,good){
				good.selected = false
				--row.choose
				if(row.select){
					row.select = false
					--this.shopSelected
				}
				this.allSelected = false
				this.sumPrice -= good.num * good.price
			},
			goodChoose(row,good){
				!good.selected?this.chooseTrue(row,good):this.chooseFalse(row,good)
			},
			shopTrue(row){
				row.orderItemList.forEach((good)=>{
					good.selected === false ? this.chooseTrue(row,good):''
				})
			},
			shopFalse(row){
				row.orderItemList.forEach((good)=>{
					good.selected === true ? this.chooseFalse(row,good):''
				})
			},
			shopChoose(row){
				!row.select ? this.shopTrue(row) : this.shopFalse(row)
			},
			allChoose(){
				this.allSelected = !this.allSelected;
				this.allSelected ? this.shopingCarlist.forEach((row)=>this.shopTrue(row)) : this.shopingCarlist.forEach((row)=>this.shopFalse(row))
			},
			sub(good){
				if(good.num === 1){
					good.num
				}else{
					good.num--
					good.selected?this.sumPrice -= good.price : ''
					let req = {goodsItemId:good.itemId,num:good.num}
					ordermodel.changeNum(req,(data)=>{
						
					})
				}
			},
			add(good){
				good.num++
				good.selected ? this.sumPrice += good.price : ''
				let req = {goodsItemId:good.itemId,num:good.num}
				ordermodel.changeNum(req,(data)=>{
					
				})
			},
			tab(){
				this.isAccounted = this.isAccounted ? 0 : 1
			},
			deleteItem(good,index){
				let req = {goodsItemIdList:good.itemId}
				ordermodel.deleteCart(req,(data)=>{
					this.shopingCarlist = data
				})
				this.oldIndex = null
				this.oldNumber = null
				this.theIndex = null
				this.theNumber = null
			},
			deleteList(){
				let array = []
				for (let item of this.shopingCarlist) {
					for (let i of item.orderItemList){
						if(i.selected == true){
							array.push(i.itemId)
						}
					}
				}
				if(array.length == 0){
					uni.showToast({
						title:"请选择商品",
						icon:'none',
						duration:1500
					})
				}else{
					let req = {goodsItemIdList:array}
					ordermodel.deleteCart(req,(data)=>{
						this.shopingCarlist = data
					})
				}
			},
			toDetail(item){
				if(item.firsttypeId == 8||item.firsttypeId == 9){
					uni.navigateTo({
						url:'orderdetail?id=' + item.orderId + '&typeid=' + item.firsttypeId
					})
				}else if(item.firsttypeId == 1){
					uni.navigateTo({
						url:'orderdetail?data=' + JSON.stringify(item) + '&typeid=' + item.firsttypeId
					})
				}
				
			},
			settlement(){
				let array = []
				for (let item of this.shopingCarlist) {
					for (let i of item.orderItemList){
						if(i.selected == true){
							array.push(i.itemId)
						}
					}
				}
				if(array.length == 0){
					uni.showToast({
						title:"请先选择商品",
						icon:'none',
						duration:1500
					})
				}else{
					let req = {goodsItemIdList:array}
					ordermodel.settleMent(req,(data)=>{
						uni.navigateTo({
							url:'confirmation?type=1&data=' + JSON.stringify(data)
						})
					})
				}
			},
			confirmOrderOk(item){
				ordermodel.confirmOrder({goodsOrderId:item.orderId},(data)=>{
					uni.showToast({
						title:'订单已完成，快去评价吧',
						duration:1500,
						icon:'none'
					})
					setTimeout(()=>{
						this.tabbarIndex = 3
					},1500)
				})
			},
			applyService(item){
				let data = {}
				data.goodsOrderItemId = item.goodsOrderItemList[0].orderItemId
				data.spec = JSON.parse(item.goodsOrderItemList[0].spec).spec
				data.image = item.goodsOrderItemList[0].picPath
				data.title = item.goodsOrderItemList[0].title
				uni.navigateTo({
					url:'service?data=' + JSON.stringify(data)
				})
			}
		},
	}
</script>

<style lang="scss">
page{
	background-color:#f2f2f2;
}
.hasLogin{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 330rpx;
	.title{
			margin:40rpx 0;
		}	
	.theme-button{width: 160rpx;}	
	image{
		width: 270rpx;
		height: 240rpx;
	}
}
.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 2rpx #f06c7a;
			}
		}
	}
}

.shopping-list{
	margin-top:80rpx;
	.nogoods{
		.noShopping{
			height:389rpx;
			width:402rpx;
			margin:248rpx 174rpx 0 174rpx;
		}
		.text{
			margin-top:20rpx;
			margin-left:210rpx;
			width:386rpx;
			height:28rpx;
			font-size:26rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(100,100,100,1);
		}
	}
	.row{
		.container{
			background-color: #fff;
			margin-top:20rpx;
			.storeInfo{
				display:flex;
				align-items: center;
				height:88rpx;
				.checkbox{
					margin-left:19rpx;
					image{
						height:34rpx;
						width:34rpx;
					}
				}
				.storeIcon{
					margin-left:19rpx;
					width:30rpx;
					height:29rpx;
				}
				.storeTitle{
					margin-left:10rpx;
					font-size:28rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(100,100,100,1);
					line-height:36rpx;
				}
			}
			.goodsInfo{
				width: 100%;
				height: 220rpx; 
				display: flex;
				align-items: center;
				position: relative;
				overflow: hidden;
				z-index: 4;
				border: 0;
				.menu{
					.icon{
						color:#fff;
						font-size: 48rpx;
					}
					position:absolute;
					width:30%;
					height:100%;
					right:0;
					display: flex;
					justify-content: center;
					align-items:center;
					background-color: red;
					color:#fff;
					z-index:2;
				}
				
				.carrier{
					@keyframes showMenu {
						0% {transform: translateX(0);}100% {transform: translateX(-30%);}
					}
					@keyframes closeMenu {
						0% {transform: translateX(-30%);}100% {transform: translateX(0);}
					}
					&.open{
						animation: showMenu 0.25s linear both;
					}
					&.close{
						animation: closeMenu 0.15s linear both;
					}
					background-color: #fff;
					position:absolute;
					display: flex;
					align-items: center;
					width:100%;
					height:100%;
					z-index:3;
					.checkbox{
						margin-left:19rpx;
						image{
							height:34rpx;
							width:34rpx;
						}
					}
					.storeImage{
						margin-left:21rpx;
						width:140rpx;
						height:140rpx;
						background:rgba(255,255,255,1);
						border:1rpx solid rgba(233, 233, 233, 1);
						border-radius:10rpx;
						padding:17rpx 15rpx 16rpx 18rpx;
						image{
							width:107rpx;
							height:107rpx;
						}
					}
					.detail{
						height:140rpx;
						width:560rpx;
						padding-left:20rpx;
						padding-right:20rpx;
						.title{
							font-size:24rpx;
							font-family:Source Han Sans CN;
							font-weight:400;
							color:rgba(60,60,60,1);
						}
						.spec{
							font-size:20rpx;
							font-family:Source Han Sans CN;
							font-weight:400;
							color:rgba(160,160,160,1);
							margin-top: 10rpx;
						}
						.choose{
							margin:10rpx 0;
							display: flex;
							justify-content: space-between;
							.price{
								font-size:24rpx;
								font-family:Source Han Sans CN;
								font-weight:400;
								color:rgba(255,102,0,1);
							}
							.number{
								display: flex;
								.sub{
									image{
										height:50rpx;
										width:50rpx;
									}
								}
								.input{
									width:113rpx;
									height:50rpx;
									border:1rpx solid rgba(180,180,180,1);
									border-radius:6rpx;
									padding-left:50rpx;
									margin-left: 10rpx;
									
								}
								.add{
									margin-left: 10rpx;
									image{
										height:50rpx;
										width:50rpx;
									}
								}
							}
						}
					}
				}
				

			}
		}
	}
	.footer{
		position:fixed;
		z-index: 999;
		/*  #ifdef  MP  */
		bottom:0;
		/*  #endif  */
		/*  #ifdef  H5  */
		bottom:100rpx;
		/*  #endif  */
		
		width:100%;
		align-items: center;
		display: flex;
		height:100rpx;
		background:rgba(252,252,252,1);
		.checkbox{
			display: flex;
			align-items:center;
			image{
				margin-left:19rpx;
				width:34rpx;
				height:34rpx;
			}
			.all{
				margin-left:16rpx;
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(120,120,120,1);
			}
		}
		.left{
			margin-left:50rpx;
			display: flex;
			align-items: center;
			.manage{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.totalTitle{
				width:220rpx;
				margin-left:150rpx;
				color:#787878;
				font-size:26rpx;
				text{
					color:#FF6600;
					font-size:30rpx;
				}
			}
			.button{
				display: flex;
				align-items: center;
				justify-content: center;
				width:120rpx;
				height:60rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:10rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		.right{
			display: flex;
			align-items: center;
			margin-left:50rpx;
			.acomplish{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,102,0,1);
			}
			.moveButton{
				margin-left:202rpx;
				width:160rpx;
				height:60rpx;
				border:1rpx solid rgba(200,200,200,1);
				border-radius:10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.button{
				margin-left:20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:120rpx;
				height:60rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:10rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
	}
}


.order-list{
	padding-top: 10rpx;
	width:100%;
	
	.noOrder{
		.noShopping{
			height:389rpx;
			width:402rpx;
			margin:248rpx 174rpx 0 174rpx;
		}
		.text{
			margin-top:20rpx;
			margin-left:210rpx;
			width:386rpx;
			height:28rpx;
			font-size:26rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(100,100,100,1);
		}
	}
}

.on{
	color:#3D7EFF;
}

.deliverMoney{
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}
.total{
	display: flex;
	justify-content: flex-end;
	margin-top: 20rpx;
}


checkbox .uni-checkbox-input{ width: 30rpx !important; height: 30rpx !important; }
/*checkbox选中后样式  */
checkbox .uni-checkbox-input.uni-checkbox-input-checked{ background: #3D7EFF; border-color:#3D7EFF; }
/*checkbox选中后图标样式  */
checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
    width: 20rpx;
    height: 20rpx;  
	line-height: 20rpx;
	text-align: center;
	font-size: 18rpx;
	color: #fff;
	background: transparent;
	transform: translate(-70%, -50%) scale(1);
	-webkit-transform: translate(-70%, -50%) scale(1);
}
.type{
	margin-top: 20rpx;
	padding:0 20rpx;
	background-color: #fff;
}

.list{
	margin-bottom: 20rpx;
}
.fee{
	display: flex;
	justify-content: space-between;
	margin-bottom:10rpx;
	align-items: center;
}

.sum{
	background-color: #fff;
	height:60rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size:28rpx;
	color:#FF6600;
}
.timepicker{
	height:84rpx;
	background-color: #fff;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.title{
		padding-left:20rpx;
		width:300rpx;
	}
	.choose{
		display: flex;
		width:450rpx;
		justify-content:space-around;
		align-items: center;
		image{
			width:10rpx;
			height:20rpx;
		}
	}
}

.payType{
	height:84rpx;
	background-color: #fff;
	border-top: 1rpx solid #f2f2f2;
	display: flex;
	padding:0 20rpx;
	justify-content: space-between;
	align-items: center;
	.content{
		display: flex;
		align-items: center;
		image{
			margin-left: 20rpx;
			width:10rpx;
			height:20rpx;
		}
	}
}

.confirm{
	width:100%;
	height:208rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding: 0 20rpx;
	.gray{
		margin-top: 39rpx;
		text{
			color:#FF6600;
		}
	}
}

.property{
	width:100%;
	height:320rpx;
	background-color: #fff;
	padding: 0 20rpx;
}

.info{
	width:100%;
	height:339rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding:0 20rpx;
	.detail{
		display: flex;
		height:64rpx;
		align-items: center;
		.line{
			width:50%;
			display: flex;
			.gray{
				margin-right: 38rpx;
			}
		}
		.lineBottom{
			display: flex;
			.gray{
				margin-right: 38rpx;
			}
		}
	}
}
.tips{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height:82rpx;
	border-bottom: 1rpx solid #f2f2f2;
	image{
		width:28rpx;
		height:28rpx;
	}
}

.remark{
	heigth:65rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color:#8C8C8C;
}
.container{
	height:650rpx;
	padding:0 20rpx;
	.top{
		height:90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.cancel{
			color:#FF6600;
		}
		.sure{
			color:#FF6600;
		}
	}
	.typeBox{
		height:127rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		image{
			width:28rpx;
			height:28rpx;
		}
	}
}

.whatInfo{
	background-color: #fff;
	margin-top: 20rpx;
	.information{
		display: flex;
		align-items: center;
		height: 84rpx;
		border-bottom: 1rpx solid #f2f2f2;
		.titlee{
			margin-left: 20rpx;
			
		}
		.contente{
			margin-left: 33rpx;
		}
	}
}
</style>