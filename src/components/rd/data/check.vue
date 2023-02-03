<template>
  <div id="check" v-if="visible">
    <el-dialog title="审核"
               :before-close="handleClose"
               :visible.sync="visible"
               class="template-dialog-container height-body-full box-white">
      <div class="dislogContent" :style="{paddingBottom: noNormal ? '50px': ''}">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="常用意见：" v-if="!noNormal">
            <el-select class="unify" v-model="form.agreeOrReject" placeholder="请选择常用意见" @change="chooseOpinion">
              <el-option label="同意" value="Y"></el-option>
              <el-option label="不同意" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核意见：">
            <el-input class="unify" type="textarea" v-model="form.operateOpinion"  placeholder="请输入审核意见" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <rd-btns :data="btns"></rd-btns>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Check",
  title: "审核操作组件",
  props: {
    noNormal: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        agreeOrReject: '',
        operateOpinion: ''
      },
      btns: [
        {
          label: '取消',
          callback: this.reject
        },
        {
          label: '确定',
          callback: this.agree,
          type: 'primary'
        }
      ]
    }
  },
  methods: {
    // 选择审核意见下拉框
    chooseOpinion (val) {
      this.form.operateOpinion = val === 'agree' ? '同意' : val === 'reject' ? '不同意' : ''
    },
    // 同意
    agree () {
      const { operateOpinion, agreeOrReject } = this.form
      if (!operateOpinion || (!agreeOrReject && !this.noNormal)) return this.$message.error('请填写常用或审核意见')
      const param = JSON.parse(JSON.stringify(this.form))
      this.form = {
        agreeOrReject: '',
        operateOpinion: ''
      }
      this.$emit('agree', param)
    },
    // 取消按钮
    reject () {
      this.handleClose()
    },
    // 关闭弹窗
    handleClose () {
      this.form = {
        agreeOrReject: '',
        operateOpinion: ''
      }
      this.$emit('closeDialog')
    }
  }
}
</script>
