<template>
	<view>
		<view class="top">
			<view class="title">合计</view>
			<view class="money">￥{{data.sum}}</view>
			<view class="image">
				<image src="/static/cut/pay_finish.png"></image>
				已支付
			</view>
		</view>
		
		<view class="bottom">
			<view>
				<view class="title">押金</view>
				<view class="content">￥{{data.costList[0].costPrice}}</view>
			</view>
			<view>
				<view class="title">租金</view>
				<view class="content">￥{{data.costList[2].costPrice}}</view>
			</view>
			<view>
				<view class="title">服务费</view>
				<view class="content">￥{{data.costList[1].costPrice}}</view>
			</view>
			<view>
				<view class="title">账单周期</view>
				<view class="content">2019-11-01至2020-10-01</view>
			</view>
			<view>
				<view class="title">关联合同</view>
				<view class="content">{{data.contractCode}}</view>
			</view>
			<view>
				<view class="title">关联房屋</view>
				<view class="content">{{data.title}}</view>
			</view>
			<view>
				<view class="title">支付时间</view>
				<view class="content">2019-11-01 14:19</view>
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
			data:''
		}
	},
	onLoad(options){
		usermodel.queryBillDetails({billCode:options.billcode},(data)=>{
			this.data = data[0]
		})
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding:20rpx 20rpx 0 20rpx;
}
.top{
	width:710rpx;
	height:313rpx;
	background-color: #fff;
	border-bottom:1rpx solid #f2f2f2;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title{
		color:rgba(60,60,60,1);
		line-height:144rpx;
	}
	.money{
		font-size:60rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
		line-height:36rpx;
	}
	.image{
			display: flex;
			align-items: center;
			font-size:24rpx;
			font-weight:400;
			color:rgba(4,186,154,1);
			line-height:123rpx;
			image{
				width:24rpx;
				height:24rpx;
			}
	}

}

.bottom{
	background-color: #fff;
	width:710rpx;
	background-size:contain;
	padding:70rpx 30rpx 0 29rpx;
	view{
		display: flex;
		justify-content: space-between;
		margin-bottom:30rpx;
		.title{
			color:rgba(60,60,60,1);
		}
		.content{
			color:rgba(140,140,140,1);
		}
	}
}
</style>
