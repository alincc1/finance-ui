<template class="search-item">
  <el-form-item :label="item.label">
    <div slot="label" v-if="labelSlot" v-title="item.label" class="ellipsis"></div>
    <div class="width-90" v-if="item.type === 'date'">
      <el-date-picker
        style="width: 100%;"
        :value-format="item.formDate || 'timestamp'"
        v-model="autoParam[item.key || (item.type + 'Id')]"
        type="date"
        clearable
        placeholder="选择日期"/>
    </div>
    <div class="width-90" v-else-if="item.type === 'dateRange'">
      <el-date-picker
        clearable
        style="width: 100%;"
        :value-format="item.formDate || 'timestamp'"
        v-model="autoParam[item.key || (item.type + 'Id')]"
        :type="item.dateType || 'datetimerange'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
    </div>
    <!-- <fc-select-date v-else-if="item.type === 'time'" v-model="autoParam[item.key || (item.type + 'Id')]" :allYear="true" clearable/>
    <fc-region-select
      v-else-if="item.type === 'region'"
      width="100%"
      :notOnSelect="false"
      v-model="autoParam[item.key || (item.type + 'Id')]"
      clearable
      disp="2"/> -->
    <!-- :useDataList="item.useDataList" -->
    <el-select v-else-if="item.tagName === 'select'"
               :data-type="item.type"
               :options="item"
               :clearable="!item.clearDisable"
               :filterable="item.filterable"
               :autoSearch="item.autoSearch"
               v-model="autoParam[item.key || (item.type + 'Id')]"
               :placeholder="item.placeholder">
      <el-option
        v-for="option in item.useDataList"
        :key="option[item.valueKey || 'value']"
        :label="option[item.labelKey || 'label']"
        :value="option[item.valueKey || 'value']">
      </el-option>
    </el-select>
    <span style="display: inline-block; width: 90%" v-else-if="item.tagName==='twoInput'">
      <el-col :span="10" style="padding: 0;">
        <el-input oninput ="value=value.replace(/[^0-9.]/g,'')" :placeholder="item.placeholder || '请输入'" :maxlength="item.maxlength || 50" clearable v-model="autoParam[item.keyOne || (item.type + 'Id')]" style="width: 100%"/>
      </el-col>
      <el-col :span="4" style="padding: 0 5px;text-align: center;">至</el-col>
      <el-col :span="10" style="padding: 0;">
        <el-input oninput ="value=value.replace(/[^0-9.]/g,'')" :placeholder="item.placeholder || '请输入'" :maxlength="item.maxlength || 50" clearable v-model="autoParam[item.keyTwo || (item.type + 'Id')]" style="width: 100%"/>
      </el-col>
    </span>
    <span style="display: inline-block; width: 90%" v-else-if="item.tagName==='twoInputSixDecimal'">
      <el-col :span="10" style="padding: 0;">
        <el-input oninput ="value=value.replace(/[^0-9.]/g,'').replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3')" :placeholder="item.placeholder || '请输入'" :maxlength="item.maxlength || 50" clearable v-model="autoParam[item.keyOne || (item.type + 'Id')]" style="width: 100%"/>
      </el-col>
      <el-col :span="4" style="padding: 0 5px;text-align: center;">至</el-col>
      <el-col :span="10" style="padding: 0;">
        <el-input oninput ="value=value.replace(/[^0-9.]/g,'').replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3')" :placeholder="item.placeholder || '请输入'" :maxlength="item.maxlength || 50" clearable v-model="autoParam[item.keyTwo || (item.type + 'Id')]" style="width: 100%"/>
      </el-col>
    </span>
    <el-input v-else :placeholder="item.placeholder || '请输入'" :maxlength="item.maxlength || 50"
              clearable
              v-model="autoParam[item.key || (item.type + 'Id')]"/>
  </el-form-item>
</template>
<script>
export default {
  name: 'tpl-search-item',
  title: '搜索组件item',
  desc: '搜索组件item',
  props: {
    labelSlot: Boolean,
    autoParam: Object,
    item: Object
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-input__inner {
  // width: 318px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #D9D9D9;
  }
</style>
