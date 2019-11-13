<template>
	<view>
		<view class="agreementButton light">
			<image src="/static/cut/agreement.png"></image>
			<view class="title">我要续租</view>
			<view class="content">您的合同到期前3-10天可发起续约申请</view>
		</view>
		<view class="agreementButton light" @tap="release()">
			<image src="/static/cut/agreement.png"></image>
			<view class="title">我要解约</view>
			<view class="content">需提前解约的话，推荐先找已方商量一下哦~</view>
		</view>
	</view>
</template>

<script>
export default{
	methods:{
		release(){
			uni.navigateTo({
				url:'agreementrelease'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.default{
	background-color: #E6E6E6;
	view{
		color:#A0A0A0;
	}	
}
.light{
	background-color: #FC8230;
	view{
		color:#fff;
	}
}
</style>
