<template>
	<view>
		<bavigationbar></bavigationbar>
		<view class="storeInfo">
			<image class="item-img" :src="store.pic" alt=""></image>
			<view class="main-left">
				<view class="main-title">
					<text class="tit">{{store.name}}<text class="iconfont icon-renyuanbaoming"></text></text>
					<like class="icon" :isKeep=like @like="keep"></like>
				</view>
				<view class="main-parameter">
					<text class="iconfont icon-xing"></text>店铺总评分{{store.score}}
				</view>
				<view class="address">
					<text class="iconfont icon-dingwei"></text>{{store.address}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="box">
				<view :class="[index==typebarIndex?'on':'']" class="item" v-for="(item,index) in apartmentType" :key="index" @tap="showType(index)">
					<view>{{item}}</view>
				</view>
			</view>
			
			
			<view class="list">
				<view class="title">{{apartmentType[typebarIndex]}}</view>
				<view class="detail" v-for="(row,number) in data" @tap="toStoreDetail(number)" :key="number">
					<image :src="row.picture"></image>
					<view class="descri">
						<view class="servey">{{row.title}}</view>
						<view class="issue">
							<view class="price">￥<text>{{row.price}}</text></view>
							<view class="floor">{{row.squareMetre}}㎡ | {{row.floor}}/{{row.attribute}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="buttons">
			<view class="whiteButton">
				<image src="/static/cut/message.png"></image>
				<view>联系TA</view>
			</view>
			<view class="cartButton">购物车</view>
		</view>
	</view>
</template>

<script>
import {LikeModel} from '@/common/models/like.js'
import {StoreModel} from '@/common/models/store.js'
let Likemodel=new LikeModel()
let storemodel = new StoreModel()
import bavigationbar from '@/components/bavigation-bar.vue'
import {HouseModel} from '@/common/models/house.js'
import like from "@/components/like.vue"
let housemodel = new HouseModel()
export default{
	components:{
		bavigationbar,
		like
	},
	data(){
		return{
			request:{
				pageNo:1,
				sellerId:'',
				houseType:''
			},
			store:{
				name:'',
				score:'',
				address:'',
				pic:''
			},
			data:[],
			apartmentType:['全部分类'],
			typebarIndex:0,
			like:null
		}
	},
	onLoad:function(option){
		this.request.sellerId = option.sellerId	
		storemodel.getSellerInfo({sellerId:option.sellerId},(data)=>{
			console.log(data)
			this.store.name = data.nickName
			this.store.score = data.mainScore
			this.store.address = data.address
			this.store.pic = data.logoPic
			
		})
		
		
		housemodel.getHouseList(this.request,(data)=>{
			this.data = data.houseList
			for(let i=0;i<data.houseTypeList.length;i++){
				this.apartmentType.push(data.houseTypeList[i])	
			}
		})
	},
	methods:{
		toStoreDetail(number){
			uni.navigateTo({
				url:'/pages/house/housedetail?data='+JSON.stringify(this.data[number])
			})
		},
		showType(index){
			this.typebarIndex = index;
			if(index==0){
				this.request.houseType = ''
			}else{
				this.request.houseType = this.apartmentType[index]
			}
			housemodel.getHouseList(this.request,(data)=>{
				this.data = data.houseList
			})
		},
		keep(letter){
			Likemodel.likeShop(this.request.sellerId,letter,(data)=>{
				this.like=letter
			})
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	margin-bottom: 110rpx;
}

.storeInfo{
	background-color: #fff;
	margin:20rpx 0;
	height: 180rpx;
	display: flex;
	padding:30rpx 20rpx;
	image{
		width:120rpx;
		height:120rpx;
		border-radius:10rpx;
		margin-right: 20rpx;
	}
	.main-left{
			width: 590rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;	
			font-size:24rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			.main-title{
				display: flex;
				justify-content: space-between;						
				.tit{
					font-size:34rpx;
					font-weight:500;
					color:rgba(60,60,60,1);		
					text{
						color: #FFCF27;
						margin-left: 10rpx;
					}	
				}
			}
			.iconfont{
				margin-right: 10rpx;
			}
		}		
	}
.content{
	position: relative;
	.box{
		position: absolute;
		top:0;
		left:0;
		.item{
			height:104rpx;
			width:180rpx;
			background-color: #fafafa;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom:1rpx solid #f2f2f2;
		}
	}
	.list{
		margin-left: 180rpx;
		background-color: #fff;
		width:570rpx;
		height:800rpx;
		overflow-y:scroll;
		overflow-x: hidden;
		.title{
			font-weight:500;
			color:rgba(60,60,60,1);
			line-height:63rpx;
			margin-left: 30rpx;
		}
		.detail{
			width:570rpx;
			height:180rpx;
			margin-left: 30rpx;
			margin-top: 40rpx;
			display: flex;
			image{
				width:160rpx;
				height:160rpx;
				border-radius:10rpx;
			}
			.descri{
				width:380rpx;
				padding:0 30rpx 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.servey{
					
				}
				.issue{
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;
					.price{
						text{
							font-size:34rpx;
							color:#FF6600;
						}
					}
					.floor{
						font-size:22rpx;
						font-weight:400;
						color:rgba(180,180,180,1);
						line-height:36rpx;
					}
				}
				
			}
		}
	}
}
.on{
	background: #fff !important;
	border-left:6rpx solid #FF6600;
}
.buttons{
	position: fixed;
	bottom:0;
	width:750rpx;
	height:110rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	.whiteButton{
		width:200rpx;
		margin-left: 20rpx;
		margin-top:1rpx;
		image{
			width:28rpx;
			height:28rpx;
			margin-right: 14rpx;
		}
	}
	.cartButton{
		margin-left: 40rpx;
		width:470rpx;
		height:70rpx;
		background: linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
		border-radius: 10rpx;
		display: flex;
		align-items:center;
		justify-content: center;
		color:#fff;
	}
}
</style>
