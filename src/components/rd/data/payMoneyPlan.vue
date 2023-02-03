<template>
  <div id="payMoneyPlan">
    <el-dialog
      class="pay-money-dialog"
      :visible.sync="visible"
      :append-to-body="true"
      :width="width"
      :top="top"
      :before-close="beforeClose">
      <div class="check-box pl-5">
        <div class="dialog-tit">{{title}}</div>
        <div class="check-item" v-for="(item, index) in planList" :key="index">
          <div class="check-left">
            <template>
              <i class="el-icon-success icon-success"></i>
            </template>
            <template v-if="index !== planList.length -1">
              <div class="left-gray-line"></div>
            </template>
          </div>
          <div class="check-right">
            <div class="right-tit mb-10">计划还款金额： 本金<strong >{{item.plannedRepaymentPrincipal}}元</strong>，利息<strong>{{item.plannedRepaymentInterest}}元</strong></div>
            <div class="right-name mb-10">{{item.phasedPlan}}期 还款日期：{{window.Z.global.date.timestampFormat(item.plannedRepaymentDate, 'YYYY-MM-DD')}}</div>
            <div class="right-tit" v-if="item.repaymentStatus === 'Y'">已还款金额： 本金<strong >{{item.repaymentPrincipal}}元</strong>，利息<strong>{{item.repaymentInterest}}元</strong></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rd-pay-money-plan',
  title: '还款计划',
  desc: '还款计划',
  props: {
    planList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => '还款计划'
    },
    width: {
      type: String,
      default: () => '500px'
    },
    top: {
      type: String,
      default: () => '15vh'
    }
  },
  data () {
    return {
      processStateMap: {
        Y: '同意',
        N: '不同意'
      }
    }
  },
  methods: {
    // 关闭dialog前
    beforeClose () {
      this.$emit('hideDialog', false)
    }
  }
}
</script>

<style lang="scss">
</style>
