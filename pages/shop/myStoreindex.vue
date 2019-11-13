<template>
	<view>
		<view class="common_navigation">
			<image src="/static/cut/leftIcon.png" class="back_icon" @tap="toBack()"></image>
			<view>我的店铺</view>
			<view class="mul_icon_box"></view>
		</view>
		<view class="open_close_box">
			<bavigationbar></bavigationbar>
			<view class="open_close_shop">
				<view v-if="isOpenDate == 0">
					<text>暂停营业中，快打开店铺营业吧~</text>
					<button type="primary" @tap="openShop">开店</button>
				</view>
				<view class="gray" v-else>
					<text>正在营业中，关店时需手动关闭。</text>
					<button type="primary" @tap="showPopup">关店</button>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="popup_title">
					<text @tap="cancelPopup">取消</text>
					<block v-if="is_select_start == 0">
						选择关店起始日期
						<text @tap="okStartPopup">确定</text>
					</block>
					<block v-else>
						选择关店结束日期
						<text @tap="okEndPopup">确定</text>
					</block>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			</uni-popup>
		</view>
		<!-- <view class="storeInfo">
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
		</view> -->
		<view class="content">
			<view class="box">
				<view :class="[index==typebarIndex?'on':'']" class="item" v-for="(item,index) in apartmentType" :key="index" @tap="showType(index)">
					<view>{{item}}</view>
				</view>
			</view>
			
			
			<view class="list">
				<view class="title">{{apartmentType[typebarIndex]}}</view>
				<view class="detail" v-for="(row,number) in data" @tap="toStoreDetail(number)" :key="number">
					<image class="picture" :src="row.picture"></image>
					<view class="descri">
						<view class="servey">{{row.title}}</view>
						<view class="issue">
							<view class="price">￥<text>{{row.price}}</text></view>
							<view class="floor">{{row.squareMetre}}㎡ | {{row.floor}}/{{row.attribute}}</view>
						</view>
					</view>
					<image src="/static/cut/address_edit.png" @tap.stop="toEdit()" class="edit_img" mode="widthFix"></image>
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
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {HouseModel} from '@/common/models/house.js'
import like from "@/components/like.vue"
let housemodel = new HouseModel()
import {UserModel} from '@/common/models/user.js'
let usermodel=new UserModel()
export default{
	components:{
		bavigationbar,
		like,
		uniPopup
	},
	data(){
		const date = new Date()
		const years = []
		const year = date.getFullYear()
		const months = []
		const month = date.getMonth() + 1
		const days = []
		const day = date.getDate()
		for (let i = 1990; i <= date.getFullYear(); i++) {
				  years.push(i)
		}
		for (let i = 1; i <= 12; i++) {
				  if(i<10){
					  months.push('0'+i)
					}else{
						months.push(i)
					}
		}
		for (let i = 1; i <= 31; i++) {
				  if(i<10){
					  days.push('0'+i)
					}else{
						days.push(i)
					}
		}
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
			like:null,
			
			isOpenDate: 1,
			is_select_start: 0,
			startDay: '',
			dateStart: '',
			dateEnd: '',
			title: 'picker-view',
			years,
			year,
			months,
			month,
			days,
			day,
			value: [9999, month - 1, day - 1],
			visible: true,
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
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
		usermodel.checkStoreInfo({sellerId: option.sellerId},(res)=>{
			console.log(res.isOpenDate);
			this.isOpenDate = res.isOpenDate;
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
		bindChange: function (e) {
		   const val = e.detail.value
		   this.year = this.years[val[0]]
		   this.month = this.months[val[1]]
		   this.day = this.days[val[2]]
		   console.log(val);
	   },
	   cancelPopup(){
			this.$refs.popup.close()
	   },
	   okStartPopup(e){
		   let now = new Date();
		   var selectDate = new Date();
		   selectDate.setFullYear(this.year);
		   selectDate.setMonth(this.month - 1);
		   selectDate.setDate(this.day);
		   if(selectDate.toDateString() != now.toDateString()){
			   this.$api.msg("起始时间必须是今天");
			   return;
		   }
		   this.dateStart = this.year+'-'+this.month+'-'+this.day
		   this.startDay = this.day
		   this.is_select_start = 1
		   console.log(this.dateStart);
	   },
	   okEndPopup(e){
		   let now = new Date();
		   var selectDate = new Date();
		   selectDate.setFullYear(this.year);
		   selectDate.setMonth(this.month - 1);
		   selectDate.setDate(this.day);
		   
		   if(selectDate < now){
			   this.$api.msg("结束时间不能小于今天");
			   return;
		   }
		   this.dateEnd = this.year+'-'+this.month+'-'+this.day
		   console.log(this.dateStart,this.dateEnd);
		   
		   this.is_select_start = 0
			this.$refs.popup.close()
			usermodel.closeShop({
				sellerId: this.request.sellerId,
				closeStatsDate: this.dateStart,
				closeEndDate: this.dateEnd
			},(data)=>{
				console.log(data);
				usermodel.checkStoreInfo({sellerId: this.request.sellerId},(res)=>{
					console.log(res.isOpenDate);
					this.isOpenDate = res.isOpenDate;
				})
			})
	   },
	   openShop(){
		   usermodel.openShop({sellerId: this.request.sellerId},(data)=>{
			   console.log(data);
			   usermodel.checkStoreInfo({sellerId: this.request.sellerId},(res)=>{
			   	console.log(res.isOpenDate);
			   	this.isOpenDate = res.isOpenDate;
			   })
		   })
	   },
	   toBack(){
	   	uni.navigateBack({
	   		delta: 1
	   	})
	   },
	   showPopup(){
		   uni.showModal({
			content: "关店后买家将无法下单，是否确认关店？",
			confirmColor: "#FF6600",
			success: (res) => {
				if(res.confirm == true){
					this.$refs.popup.open()
					this.value = [9999, this.month - 1, this.day - 1]
				}
			}
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
		height:72vh;
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
			.picture{
				width:160rpx;
				height:160rpx;
				border-radius:10rpx;
			}
			.edit_img{
				display: block;
				width: 36rpx;
				height: 37rpx;
			}
			.descri{
				width:320rpx;
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
