<template>
	<view>
		<view v-for="(item,index) in agreementList" :key="index">
			<view class="top">
				<view class="status" v-if="item.contractState==1">履行中</view>
				<view class="status" v-if="item.contractState!=1">已解约</view>
				<view class="icon">乙方</view>
			</view>
			<view class="middle" @tap="toDetail(item)">
				<view class="title">#{{item.title}}#</view>
				<view class="default">合同编号：{{item.contractCode}}</view>
				<view class="default">合同时长：{{item.contractStarttime}}至{{item.contractEndtime}}</view>
				<view class="default">月租金：￥{{item.rental}}</view>
			</view>
			<view class="bottom">
				<view class="time">{{item.createDate}}</view>
				<view class="buttons" v-if="item.contractState==1">
					<view class="button">联系TA</view>
					<view class="button" @tap="toChange()">合同变更</view>
				</view>
				<view v-if="item.contractState!=1" class="buttons">
					<view class="button">删除合同</view>
					<view class="button">账单详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	data(){
		return{
			agreementList:[]
		}
	},
	onLoad() {
		usermodel.queryContractDetails((data)=>{
			this.agreementList = data
		})
	},
	methods:{
		toDetail(item){
			uni.navigateTo({
				url:'agreementdetail?data=' + JSON.stringify(item)
			})
		},
		toChange(){
			uni.navigateTo({
				url:'agreementchange'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.top{
	margin-top: 20rpx;
	background-color: #fff;
	height:100rpx;
	border-bottom:1rpx solid #DCDCDC;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.status{
		margin-left: 20rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
		line-height:40rpx;
	}
	.icon{
		width:99rpx;
		height:40rpx;
		background:rgba(41,181,246,1);
		border-radius:20rpx 0rpx 0rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
	}
}
.middle{
	background-color: #fff;
	height:254rpx;
	border-bottom:1rpx solid #DCDCDC;
	padding-left: 19rpx;
	padding-top: 29rpx;
	.title{
		font-weight:400;
		color:rgba(60,60,60,1);
		line-height:36rpx;
	}
	.default{
		margin-top: 25rpx;
		font-weight:400;
		color:rgba(140,140,140,1);
		line-height:36rpx;
	}
}
.bottom{
	background-color: #fff;
	height:100rpx;
	display: flex;
	.time{
		width:370rpx;
		padding-top: 41rpx;
		padding-left: 19rpx;
		font-size:22rpx;
		font-weight:400;
		color:rgba(160,160,160,1);
	}
	.buttons{
		width:380rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.button{
			display: flex;
			align-items: center;
			justify-content: center;
			width:160rpx;
			height:60rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(200,200,200,1);
			border-radius:10rpx;
		}
	}
}
</style>
