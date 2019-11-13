<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in billType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex==0" class="unpaid">
			<view v-for="(item,index) in unpaidList" class="item" :key="index" @tap="toDetail()">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='status'>待支付</view>
				</view>
				<view class="billdetail">
					<view>电费：￥{{item.elec}}</view>
					<view>水费：￥{{item.water}}</view>
					<view>服务费：￥{{item.service}}</view>
				</view>
				<view class="billtotal">
					<view class="total">应缴金额：<text>￥{{item.total}}</text></view>
					<view class="whiteButton">去付款</view>
				</view>
			</view>
		</view>
		<view v-if="tabbarIndex==1" class="unpaid">
			<view v-for="(item,index) in paidList" class="item" :key="index">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='paidstatus'>已支付</view>
				</view>
				<view class="billdetail">
					<view>电费：￥{{item.elec}}</view>
					<view>水费：￥{{item.water}}</view>
					<view>服务费：￥{{item.service}}</view>
				</view>
				<view class="billedtotal">
					<view class="total">实缴金额：<text>￥{{item.total}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			headerPosition:"fixed",
			headerTop:"0px",
			billType: ['未缴账单','已缴账单'],
			tabbarIndex:0,
			unpaidList:[
				{
					title:'万科天誉二期8508的2月份账单',
					elec:'80.00',
					water:'60：00',
					service:'60.00',
					total:'200.00'
				},
				{
					title:'万科天誉二期8508的2月份账单',
					elec:'80.00',
					water:'60：00',
					service:'60.00',
					total:'200.00'
				}
			],
			paidList:[
				{
					title:'万科天誉二期8508的2月份账单',
					elec:'80.00',
					water:'60：00',
					service:'60.00',
					total:'200.00'
				},
				{
					title:'万科天誉二期8508的2月份账单',
					elec:'80.00',
					water:'60：00',
					service:'60.00',
					total:'200.00'
				}
			]
		}
	},
	onLoad:function(){
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
	methods:{
		toDetail(){
			uni.navigateTo({
				url:'billdetail'
			})
		},
		showType(tbIndex){
			this.tabbarIndex = tbIndex;
			this.list = this.billType[tbIndex];
		},
	}
}
</script>

<style lang='scss'>
page{
	background-color: #f2f2f2;
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
	border-top:1rpx solid #f2f2f2;
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
				color:#FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}

.unpaid{
	margin-top: 84rpx;
	.item{
		height:373rpx;
		margin-top: 20rpx;
		background-color: #fff;
		padding: 39rpx 19rpx 0 19rpx;
		.head{
			display: flex;
			justify-content:space-between;
			.title{
				font-size:28rpx;
				font-weight:400;
				color:rgba(60,60,60,1);
				line-height:36rpx;
			}
			.status{
				font-size:24rpx;
				font-weight:400;
				color:rgba(255,0,0,1);
				line-height:40rpx;
			}
		}
		.billdetail{
			margin-top:39rpx;
			border-bottom: 1rpx solid #f2f2f2;
			view{
				font-size:24rpx;
				font-weight:400;
				color:rgba(100,100,100,1);
				line-height:54rpx;
			}
		}
		.billtotal{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			.total{
				color:#a0a0a0;
				font-size:24rpx;
				text{
					color:#FF6600;
					font-size:30rpx;
				}
			}
		}
	}
}

.billedtotal{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100rpx;
	.total{
		color:#a0a0a0;
		font-size:24rpx;
		text{
			color:#FF6600;
			font-size:30rpx;
		}
	}
}
.paidstatus{
	font-size:24rpx;
	font-weight:400;
	color:rgba(160,160,160,1);
	line-height:40rpx;
}
</style>
