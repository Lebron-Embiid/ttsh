<template name="storeTime">
	<view class="time">
		<view class="payTime gray">{{time}}</view>
		<view class="buttons">
			<block v-if="type=='unpaid'"><view class="default" @tap.stop="cancelOrder">取消订单</view><view class="pay" @tap.stop="toPayment">去付款</view></block>
			<block v-if="type=='unreceived'"><view class="default" @tap="remindDeliver(row)">退款</view></block>
			<block v-if="type=='received'"><view class="default" @tap="showLogistics(row)">退款</view></block>
			<block v-if="type=='deliver'"><view class="pay" @tap.stop="confirmOk">确认完成</view></block>
			<block v-if="type=='completed'"><view class="default" @tap.stop="applyService">申请售后</view><view class="pay" @tap.stop="goRating">去评价</view></block>
			<block v-if="type=='refunds'"><view class="pay">取消退款</view></block>
			<block v-if="type=='cancelled'"><view class="default">删除订单</view></block>
			<block v-if="type=='serviced'"><view class="default">联系TA</view><view class="pay" @tap.stop="cancelApply">取消申请</view></block>
			<block v-if="type=='waiting'"><view class="default">联系TA</view></block>
			<block v-if="type=='finished'"><view class="default" @tap.stop="applyService">申请售后</view></block>
		</view>
	</view>
</template>

<script>
export default {
	name:'storeTime',
	props:{
		time:{
			type:String,
			value:''
		},
		type:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	},
	methods:{
		confirmOk(){
			this.$emit('confirmOrder')
		},
		goRating(){
			this.$emit('rating')
		},
		applyService(){
			this.$emit('backOrder')
		},
		cancelOrder(){
			this.$emit('cancelOrder')
		},
		toPayment(){
			this.$emit('toPay')
		},
		cancelApply(){
			this.$emit('cancelBack')
		}
	}
}
</script>

<style lang="scss">
.time{
	margin-top: 20rpx;
	background-color: #fff;
	border-top: 1rpx solid #f2f2f2;
	height:100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.buttons{
		display: flex;
		view{
			margin-left: 20rpx;
			width:160rpx;
			height:60rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			display: flex;
			align-items: center;
			justify-content: center;	
		}
		.default{
			border:1rpx solid rgba(200,200,200,1);
			color:#8C8C8C;
		}
		.pay{
			border:1rpx solid rgba(255,102,0,1);
			color:#FF6600;
		}
	}

}
</style>
