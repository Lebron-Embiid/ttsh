<template name="storeMain">
	<view class="box">
		<view class="img"><image :src="pic"></image></view>
		<view class="content">
			<view class="detail">
				<view class="title">{{title}}</view>
				<view class="price">{{price}}</view>
			</view>
			<view class="detail">
				<view class="gray">{{specsize}}</view>
				<view class="gray">{{spec}}</view>
			</view>
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	name:'storeMian',
	props:{
		pic:{
			type:String,
			value:''
		},
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
		specsize:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss">
.box{
	background-color: #fff;
	display: flex;
	.img{
		width:140rpx;
		height:140rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(233, 233, 233, 1);
		border-radius:10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width:107rpx;
			height:107rpx;
			border-radius:10rpx;
		}
	}
	.content{
		margin-left: 20rpx;
		width:550rpx;
		.detail{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
		}	
	}
}
</style>
