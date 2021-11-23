<template>
   <view>
      <text class="topTitle gradientFont">成人高考报名条件</text>
      <view class="content">
         <view class="title">一、报考对象</view>
         <view class="text">
            <text class="strong">符合下列条件的中国公民可以报名:</text>
            <text>1.遵守中华人民共和国宪法和法律。</text>
            <text>2.国家承认学历的各类高、中等学校在校生以外的在职、从业人员和社会其他人员。</text>
            <text>3.身体健康，生活能自理，不影响所报专业学习。</text>
            <text>4.报考高中起点升本科或高中起点升专科的考生应具有高中文化程度。报考专科起点升本科的考生必须是已取得经教育部审定核准的国民教育系列高等学校、高等教育自学考试机构颁发的专科毕业证书、本科肄业证书或以上证书的人员。</text>
            <text>5.报考成人高校医学门类专业的考生应具备以下条件:</text>
            <text>⑴报考临床医学、口腔医学、预防医学、中医学等临床类专业的人员，应当取得省级卫生行政部门颁发的相应类别的执业助理医师及以上资格证书或取得国家认可的普通中专相应专业学历;或者县级及以上卫生行政部门颁发的乡村医生执业证书并具有中专学历或中专水平证书。</text>
            <text>⑵报考护理学专业的人员应当取得省级卫生行政部门颁发的执业护士证书。</text>
            <text>⑶报考医学门类其他专业的人员应当是从事卫生、医药行业工作的在职专业技术人员。</text>
            <text>⑷考生报考的专业原则上应与所从事的专业对口。</text>
         </view>
         <view class="hrImg">
            <image src="~static/images/conditionHrImg.png" mode="widthFix" />
         </view>
         <view class="text">
            <text class="retraction">在中国定居并符合上述报名条件的外国侨民，持所在 (区、市)公安机关填发的护照和《外国人永久居留证》(或《外侨居留证》)，可在设区市(直管县〈市〉)(简称"设区市")招考办(教育考试院)(简称"招考办")报名。</text>
         </view>
         <text class="title">二、报考费用</text>
         <view class="text">
            <text class="retraction">各地成人高考报名费用都不一样，而且历年或许都会有变化，各位考生可以进入各省教育招生平台进行详细查询。</text>
         </view>
         <text class="title">三、报名时间</text>
         <view class="text">
            <text class="retraction">
               成人高考报名从2007年开始实行网上报名，此举标志着成人高考步入网上报名、网上阅卷、网上录取信息化时代。成人高考网上报名一般在每年的8月中旬至9月上旬，随后，考生要到各区县指定地点进行现场确认，现场确认需要带网报号及身份证件，毕业证原件，复印件。外地考生需要带暂住证。10月中旬的一个双休日参加全国统考。成人高考网上报名期间，考生登录各省市区教育考试院网站报名时，除要填写个人信息、选报志愿学校和专业外，还要同时完成网上缴费，才算完成了全部网报手续。如果考生未按规定网上缴费，其报名无效，随后也将无法参加现场确认和统一考试。
            </text>
         </view>
         <text class="title">四、含金量</text>
         <view class="text footer">
            <text class="retraction">成人高考文凭自从30多年前国家教育部出台，允许社会各界人士参加全国成人高考，满足大部分社会在职人员和中等在校生享受高等教育的机会。</text>
            <text class="retraction">成人高考文凭是国家承认的学历文凭之一。从成人高考学习本质上讲，成人高考、自学考试和普通高考一样，都是选拔人才的国家考试，只是由于本身的学习特征需要，才在学习形式等环节上有所差别，进行了一定区分。</text>
            <text class="retraction">成人高考学历是国家承认的学历，考研、考公务员、出国留学、评职称都是可以的。</text>
         </view>
      </view>

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import uniPopupShare from "@/components/uni-popup-share.vue";
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {};
   },
   methods: {},

   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
};
</script>

<style lang="scss" scoped>
.topTitle {
   display: block;
   margin: 10rpx auto 0;
   font-size: 50rpx;
   text-align: center;
   font-weight: 500;
}
.content {
   width: 90vw;
   margin: auto;
   padding-bottom: 10rpx;
   .title {
      display: inline-block;
      padding: 5rpx 20rpx;
      margin: 40rpx 0 15rpx 0;
      color: #fff;
      background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
      border-radius: 1em;
   }
   .text {
      background-color: rgba($color: #000000, $alpha: 0.05);
      padding: 1em;
      box-sizing: border-box;
      text-align: initial;
      text {
         display: block;
         font-size: 30rpx;
         line-height: 40rpx;
      }
      .strong {
         font-weight: 700;
      }
      .retraction {
         text-indent: 2em;
      }
   }
   .hrImg {
      width: 65vw;
      margin: 50rpx auto;
      image {
         width: 100%;
         vertical-align: top;
      }
   }
   .footer {
      text:nth-of-type(2) {
         margin: 30rpx 0;
      }
   }
}
</style>
