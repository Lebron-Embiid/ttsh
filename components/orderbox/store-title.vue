<template name="storeTitle">
	<view class="storeInfo">
		<view class="store">
			<image class="storeIcon" src="/static/cut/dpicon.png"></image>
			<view class="storetitle">{{title}}</view>
			<image class="arrow" src="/static/cut/grayright.png"></image>
		</view>
		<view class="status">{{typeText[status]}}</view>
	</view>
</template>

<script>
export default {
	name:'storeTitle',
	props:{
		price:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:''
		},
		spec:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		},
		status:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			typeText:{
				unpaid:'等待买家付款',
				unreceived:'等待商家接单',
				received:'商家已接单',
				deliver:'发货中',
				completed:'交易完成',
				refunds:'退款中',
				cancelled:'退款成功',
				serviced:'商家处理中',
				finished:'已完成',
				waiting:'等待商家签约'
			},
		};
	}
}
</script>

<style lang="scss">
.storeInfo{
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.store{
		display: flex;
		align-items: center;
		.storeIcon{
			width:26rpx;
			height:23rpx;
		}
		.storetitle{
			font-size: 24rpx;
			margin-left: 10rpx;
		}
		.arrow{
			margin-left: 10rpx;
			width:8.5rpx;
			height:16.5rpx;
		}
	}
	.status{
		font-size:22rpx;
		color:#FF6600;
	}
}
</style>
