<template>
	<view class="all">
		<view class="navigationBar" :class="[displayLink==1?'':'opa']">
			<image src="/static/cut/back_white.png" @tap="toUser()"></image>
			<view>二维码邀请</view>
		</view>
		
		<view class="body" :class="[displayLink==1?'':'opa']" @tap.stop="hideLink()">
			
			<view class="body-code">
				<image src="" mode=""></image>
			</view>
			<view class="body-font">
				<image @click="clickShow" src="/static/shareLink.png"></image>
				<image src="/static/cut/share_pic.png"></image>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="share-wrap" @click="changeWrap" id="wrap" v-show="showWrap">
			<view class="share-wrap-cont">
				<view class="share-wrap-content">
					<view class="share-wrap-list" v-for="(item,index) in shareList" :key="index">
						<image :src="item.src"></image>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
export default{
	data(){
		return{
			displayLink:true,
			shareList:[{
				title:'微信好友',
				src:'/static/shareWx.png'
			},{
				title:"微信朋友圈",
				src:'/static/shareP.png'
			},{
				title:"QQ好友",
				src:'/static/shareQQ.png'
			},{
				title:'QQ空间',
				src:'/static/shareK.png'
			}],
			showWrap:false
		}
	},
	onShareAppMessage(res){
		return{
			title:'江南皮革厂倒闭了',
			path:'/pages/index/index'
		}
	},
	methods:{
		showLink(){
			this.displayLink = false;
		},
		hideLink(){
			this.displayLink = true;
		},
		toUser(){
			uni.switchTab({
				url:'../user'
			})
		},
		clickShow(){
			this.showWrap = true;
		},
		changeWrap(e){
			let id = e.target.id;
			if( id === 'wrap' ){
				this.showWrap = false;
			}
		}
	}
}
</script>

<style lang="scss">
		
.all{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	// background-color: red;
	background: url('~@/static/shareLogo.png') no-repeat;
	background-size: 100% 90%;
	background-color: #fef0f0;
	// background-position: 0 -100rpx;
}
.navigationBar{
	height:128rpx;
	// background:#ff674b;
	position:relative;
	image{
		position: absolute;
		width:20rpx;
		height:34rpx;
		top:67rpx;
		left:20rpx;
	}
	view{
		font-size:36rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
		position: absolute;
		top:67rpx;
		left:300rpx;
	}
}	

.body{
	flex: 1;
	
	.title{
		position:absolute;
		top:554rpx;
		left:200rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	.code{
		position: absolute;
		top:604rpx;
		left:200rpx;
		height:350rpx;
		width:350rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		image{
			width:294rpx;
			height:294rpx;
		}
	}
	.number{
		position: absolute;
		top:984rpx;
		left:236rpx;
		font-size:34rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	button{
		padding:0;
		width:280rpx;
		height:80rpx;
		position: absolute;
		top:1075rpx;
		left:80rpx;
		image{
			width:280rpx;
			height:80rpx;	
		}
	}
	.shareLink{

	}
	.sharePic{
		width:280rpx;
		height:80rpx;
		position: absolute;
		top:1075rpx;
		left:390rpx;
	}
	
}

.link{
	position:fixed;
	z-index:99;
	bottom:0;
	width:750rpx;
	height:302rpx;
	background:rgba(236,236,236,1);
	border-radius:20rpx 20rpx 0rpx 0rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	button{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ECECEC;
		image{
			width:140rpx;
			height:140rpx;
		}
		view{
			margin-top: 19rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
			line-height:36rpx;
		}
	}

}



.none{
	display: none;
}

.opa{
	opacity: 0.3;
}
.body-code{
	// width: 250rpx;
	// height: 250rpx;
	padding: 30rpx;
	position: absolute;
	bottom: 234rpx;
	left: 50%;
	transform: translateX(-50%);
	display: inline-block;
	background-color: white;
	image{
		width: 294rpx;
		height: 294rpx;
	}
}
.body-font{
	position: absolute;
	bottom: 61rpx;
	left: 0;
	width: 100%;
	height: 80rpx;
	// background-color: #007AFF;
	display: flex;
	justify-content: center;
	image{
		width: 280rpx;
		height: 80rpx;
	}
	image:first-of-type{
		margin-right: 30rpx;
	}
}
.share-wrap{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.3);
	z-index: 999;
	&-cont{
		position: fixed;
		width: 100%;
		height: 300rpx;
		bottom: 0;
		left: 0;
		background-color: rgba(236,236,236,1);
		display: flex;
		align-items: center;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}
	&-content{
		padding: 0 20rpx;
		display: flex;
	}
	&-list{
		margin-right: 50rpx;
		text-align: center;
		image{
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
		text{
			font-size: 24rpx;
			color: #3C3C3C;
			vertical-align: top;
		}
	}
}
</style>
