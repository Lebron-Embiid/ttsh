<template>
    <view>
		<bavigationbar></bavigationbar>
		<Swiper :swiperImage="swiperImg"></Swiper>
		<view class="chooseType">
			<view class="title">{{position}}服务</view>
			<view class="icon" @tap="pop()">
				筛选<image src="/static/cut/filter_icon.png"></image>
			</view>
		</view>
		<block v-if="type==8||type==10">
			<block v-for="(item,index) in data" :key="index">
				<item-list :src="item.smallPic" :money="item.price" 
				:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
				v-on:toDetailPage="toDetail(item)" v-on:addcart="addToCart(item)"></item-list>
			</block>
		</block>
		
		<block v-if="type==3||type==9">
			<block v-for="(item,index) in data" :key="index">
				<item-service :src="item.smallPic" :money="item.price" 
				:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
				@tap="toDetail(item)"></item-service>
			</block>
		</block>
		<uni-popup ref="poptop" type="top">
			<view class="secondType">
				<view class="title">服务子类</view>
				<view class="typeContent">
					<view v-for="(item,index) in typeData" :class="[secondIndex==index?'secondOn':'grayButton']" 
					:key="index" @tap="chooseSecondType(item,index)">
						{{item.title}}
					</view>
				</view>
				<view class="title">排序</view>
				<view class="order">
					<view class="grayButton">价格倒序</view>
					<view class="grayButton">价格正序</view>
					<view class="grayButton">距离最近</view>
				</view>
				<view class="button"  @tap="confirmSecond">确定</view>
			</view>
		</uni-popup>
		<uni-load-more :status='status'></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import bavigationbar from "@/components/bavigation-bar.vue"
import Swiper from "@/components/Swiper.vue"
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import itemList from '@/components/item-list.vue'
import itemService from '@/components/item-service.vue'
import {ProvideModel} from '@/common/models/provide.js'
const providemodel = new ProvideModel()
export default {
	filters: {
		titleFormat: function(title) {
			if(title.length>25){
				return title.substring(0,25) + '...'
			}else{
				return title
			}
			
		}
	},
	components: {
		bavigationbar,
		Swiper,
		uniPopup,
		itemList,
		uniLoadMore,
		itemService
	},
	data () {
		return {
			dataReq:{
				userType:1,
				pageNo:1,
				pageSize:10,
				goodsFirsttype:''
			},
			data:'',
			type:'',
			position:'',
			swiperImg:[],
			status:'more',
			typeData:'',
			secondIndex:null,
			secondId:''
		}
	},
	onLoad(options) {
		
		this.type = options.type
		this.getTypeName()
		providemodel.getSwiperImage({position:this.position},(data)=>{
			for(let item of data){
				this.swiperImg.push(item.coverImg)
			}
		})
		this.dataReq.goodsFirsttype = this.type
		providemodel.getItemList(this.dataReq,(data)=>{
			this.data = data
		})
	},
	onShow(){
		let firstType = ''
		if(this.type==8){
			firstType = '生活'
		}else if(this.type==3){
			firstType = '家政'
		}else if(this.type==10){
			firstType = '代购'
		}else if(this.type==9){
			firstType = '维修'
		}
		providemodel.getSecondType({firstType,type:2},(data)=>{
			this.typeData = data
		})
		uni.setNavigationBarTitle({
			title:firstType + '服务'
		})
	},
	onReady() {
		
	},
	onReachBottom() { 
		this.status="loading"
		let len = this.data.length
		if(len%10==0){
			this.dataReq.pageNo = parseInt(len/10) + 1
		}else if(len % 10 > 0){
			this.dataReq.pageNo = parseInt(len/10) + 2
		}
		
		providemodel.getItemList(this.dataReq,(data)=>{
			if(data.length == 10){
				this.data = this.data.concat(data)
			}else if(data.length > 0 && data.length < 10){
				this.data = this.data.concat(data)
				this.status = 'noMore'
			}else if(data.length == 0){
				this.status = 'noMore'
			}
		})
	},
	methods: {
		getTypeName(){
			if(this.type==8){
				this.position = '生活'
			}else if(this.type==10){
				this.position = '代购'
			}else if(this.type==3){
				this.position = '家政'
			}else if(this.type==9){
				this.position = '维修'
			}
		},
		provide:function(e){
			this.chenck=!this.chenck
		},
		provided:function(e){
			this.chenck=!this.chenck
		},
		screen (type) {
			this.type = type
			this.$refs["popup"].open()
		},
		selec (index) {
			console.log(index)
			this.selectSpec=index;
		},
		change(e) {
			console.log(e.show)
		},
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		toDetail(item){
			uni.navigateTo({
				url:'/pages/provide/detail?sellerId=' + item.sellerId + '&id=' + item.id + '&type=' + this.type
			})
		},
		addToCart(item){
			providemodel.addCart({goodsItemId:item.defaultItemId,num:1},(data)=>{
				uni.showToast({
					title:"添加购物车成功",
					duration:1500,
					icon:'none'
				})
			})
		},
		pop(){
			this.$refs.poptop.open()
		},
		chooseSecondType(item,index){
			if(this.secondIndex==null){
				this.secondIndex = index
				this.secondId = item.secondtypeinfoId
				
			}else{
				if(this.secondIndex == index){
					this.secondIndex = null
					this.secondId = item.secondtypeinfoId
				}else{
					this.secondIndex = index
					this.secondId = item.secondtypeinfoId
				}
			}
		},
		confirmSecond(item){
			if(this.secondIndex==null){
				this.dataReq.goodsSecondtype = ''
				this.dataReq.pageNo = 1
				providemodel.getItemList(this.dataReq,(data)=>{
					this.data = data
				})
			}else{
				this.dataReq.goodsSecondtype = this.secondId
				this.dataReq.pageNo = 1
				providemodel.getItemList(this.dataReq,(data)=>{
					this.data = data
				})
			}
			this.$refs.poptop.close()
		}
	}

}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.chooseType{
	height:84rpx;
	background-color: #fff;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.title{
		border-left: 8rpx solid #FF6600;
		font-size:28rpx;
		font-weight:400;
		color:rgba(60,60,60,1);
	}
	.icon{
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(120,120,120,1);
		image{
			width:24rpx;
			height:26rpx;
		}
	}
}

.secondOn{
	background:rgba(255,241,232,1);
	border:1rpx solid rgba(255,102,0,1);
	border-radius:10rpx;
	height:58rpx;
	padding:0 30rpx 0 30rpx;
	line-height: 58rpx;
	margin-right: 19rpx;
}
</style>
