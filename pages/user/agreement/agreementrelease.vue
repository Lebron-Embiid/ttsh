<template>
	<view>
		<view class="user">
			<view class="title">签约人</view>
			<view>欧阳华</view>
		</view>
		
		<view class="user">
			<view class="title">联系电话</view>
			<view>13751157643</view>
		</view>
		
		<view class="address">
			<view class="title">服务地址</view>
			<view class="content">广东省深圳市龙岗区龙岗街道9002号志联佳大厦508号</view>
		</view>
		
		<view class="reason">
			<view class="choose">您要解约的原因</view>
			<picker @change="bindPickerChange" :value="index" :range="array" >
				<view class="container">
					<view class="detail">{{array[index]}}</view>
					<image src="/static/cut/grayright.png"></image>
				</view>
			</picker>
		</view>
		
		<view class="remark1">注：未在合同约定时间内解约的，</view>
		<view class="remark2">还需甲方同意解约，才可正式解除合同。</view>
		
		
		<view class="submit-button">需支付违约金￥1000.0</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			index:0,
			array:['合同到期','个人原因','服务太差']
		}
	},
	methods:{
		bindPickerChange: function(e) {
			this.index = e.target.value
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	margin-top: 20rpx;
}
.user{
	background-color: #fff;
	display: flex;
	align-items: center;
	height:84rpx;
	border-bottom:1rpx solid #f2f2f2;
}
.title{
		width:144rpx;
		padding-left: 19rpx;
		color:rgba(100,100,100,1);
}
.address{
	height:121rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
}	
.reason{
	margin-top: 20rpx;
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 20rpx;
	.container{
		display: flex;
		align-items: center;
	}
}
image{
	width:10rpx;
	height:20rpx;
	margin-left: 10rpx;
}

.remark1{
	color:rgba(255,102,0,1);
	margin-top: 80rpx;
	margin-left: 180rpx;
}
.remark2{
	color:rgba(255,102,0,1);
	margin-left: 144rpx;
}
</style>
