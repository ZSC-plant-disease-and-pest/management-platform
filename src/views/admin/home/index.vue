<template>
  <div style="display: flex; justify-content: space-between">
    <el-card class="picture-tagging" style="width: 49%; height: 40%">
      <template #header>
        <div class="card-header">
          <span> 待标注图片 </span>
        </div>
      </template>
      <el-table :data="taggingTableData" style="width: 100%">
        <el-table-column
          v-for="item in taggingTableColumn"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column
        label="操作"
        width="119"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              style="color: rgb(63, 186, 246)"
              @click="check(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
              style="color: rgb(65, 209, 204)"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              style="color: rgb(244, 96, 84)"
              @click="remove(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="picture-tagging" style="width: 49%; height: 40%">
      <template #header>
        <div class="card-header">
          <span> 待标注图片 </span>
        </div>
      </template>
      <el-table :data="taggingTableData" style="width: 100%">
        <el-table-column
          v-for="item in taggingTableColumn"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column
        label="操作"
        width="119"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              style="color: rgb(63, 186, 246)"
              @click="check(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
              style="color: rgb(65, 209, 204)"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              style="color: rgb(244, 96, 84)"
              @click="remove(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  toRefs,
  computed,
  watch,
  getCurrentInstance,
  reactive,
  unref
} from 'vue';

export default defineComponent({
  setup () {
    const pictureTagging = reactive([
      {
        userId: '20210721001'
      }
    ]);
    const taggingTableData = reactive([
      {
        userId: '20210721001',
        name: '月季'
      },
      {
        userId: '20210721002',
        name: '云杉'
      },
      {
        userId: '20210721003',
        name: '日本樱花'
      },
      {
        userId: '20210721010',
        name: '麒麟掌'
      }
    ]);
    const taggingTableColumn = reactive([
      {
        prop: 'userId',
        label: '用户编号',
        width: 'auto'
      },
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      }
    ]);
    return {
      pictureTagging,
      taggingTableData,
      taggingTableColumn
    };
  }
});
</script>

<style lang="scss" scoped></style>
