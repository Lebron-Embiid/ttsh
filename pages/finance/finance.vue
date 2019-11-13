<template>
	<view>
		<bavigationbar></bavigationbar>
		<swiper :swiperImage="swiperImage"></swiper>
		<view class="indexChooseType">
			<view class="title">生活服务</view>
			<view class="icon" @tap="pop()">
				筛选<image src="/static/cut/filter_icon.png"></image>
			</view>
		</view>
		
		<block v-for="(row,number) in data" :key="number">
			<item-service :src="row.picture" :title="row.title.substring(0,25)+'...'"
			:money="row.price" :desc="row.loan_rates" @tap="toDetail(number)"></item-service>
		</block>
		<uni-load-more :status='status'></uni-load-more>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import Swiper from "@/components/Swiper.vue"
	import itemService from '@/components/item-service.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {FinanceModel} from '@/common/models/finance.js'
	let financemodel = new FinanceModel()
	export default {
		components:{
			bavigationbar,
			Swiper,
			itemService,
			uniLoadMore
		},
		data() {
			return {
				status:'more',
				swiperImage:[],
				data:[]
			}
		},
		onLoad(){
			financemodel.getSwiperImage((data)=>{
				for(let i = 0;i<data.length;i++){
					this.swiperImage.push(data[i].coverImg)
				}
			})
			let req = {pageNo:1,pageSize:10}
			financemodel.getFinanceList(req,(data)=>{
				this.data = data
			})
		},
		onReachBottom(){
			this.status = 'loading'
			let len = this.data.length
			let pageNo = parseInt(len/10)
			if(len % 10 == 0){
				pageNo += 1
			}else if(len % 10 > 0){
				pageNo += 2
			}
			
			let req = {pageNo,pageSize:10}
			financemodel.getFinanceList(req,(data)=>{
				if(data.length == 10){
					this.data = this.data.concat(data)
				}else if (data.length>0&&data.length<10){
					this.data = this.data.concat(data)
					this.status = 'noMore'
				}else if(data.length == 0){
					this.status = 'noMore'
				}
			})
			
		},
		methods: {
			toDetail(number){
				let item = this.data[number]
				uni.navigateTo({
					url:'financedetail?financeId=' + item.id + '&code=' + item.financeCode + '&sellerId=' + item.sellerId
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
