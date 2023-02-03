<template>
  <div id="info-table">
    <el-row class="row-container">
      <el-col :span="6" class="col-left" v-if="sideData">
        <el-image
          class="row-item-pic"
          :style="{width: sideData.width || '140px', height: sideData.height || '140px'}"
          :src="sideData.url"
          :preview-src-list="[sideData.url]">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <span>{{sideData.name}}</span>
      </el-col>
      <el-col :span="9">
        <template v-for="(item, index) in data">
          <el-row class="row-flex" :key="index" v-if="index % 2 === 0">
            <el-tooltip placement="right" :content="item.label">
              <el-col :span="6">{{item.label}}</el-col>
            </el-tooltip>
            <el-tooltip placement="right" :content="item.value">
              <el-col :span="18" class="row-flex-value">
                {{item.value || (item.value === 0 ? item.value : '---')}}
                <a class="a-button" v-if="item.button" href="javascript:;" @click="item.callback(item.value)">修改</a>
              </el-col>
            </el-tooltip>
          </el-row>
        </template>
      </el-col>
      <el-col :span="9">
        <template v-for="(item, index) in data">
          <el-row class="row-flex" :key="index" v-if="index % 2 === 1">
            <el-tooltip placement="right" :content="item.label">
              <el-col :span="6">{{item.label}}</el-col>
            </el-tooltip>
            <el-tooltip placement="right" :content="item.value">
              <el-col :span="18" class="row-flex-value">
                {{item.value || (item.value === 0 ? item.value : '---')}}
                <a class="a-button" v-if="item.button" href="javascript:;" @click="item.callback(item.value)">修改</a>
              </el-col>
            </el-tooltip>
          </el-row>
        </template>
      </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'infoTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    sideData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss">
</style>
