<template>
  <el-drawer
    title="新闻图片管理"
    v-model="openDrawer"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      size="small"
      :model="searchForm"
      label-width="30px"
    >
      <el-card class="drawer-card">
        <template #header>
          <span>
            查询新闻图片
          </span>
        </template>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="年：">
              <el-input
                class="input-common"
                type="number"
                clearable
                v-model="searchForm.year"
                @input="yearInput"
                placeholder="输入年份"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="月：">
              <el-input
                class="input-common"
                type="number"
                clearable
                v-model="searchForm.month"
                @input="monthInput"
                placeholder="输入月份"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              size="small"
              :loading="isLoading"
              @click="search"
            >
              搜索
            </el-button>
          </el-col>
        </el-row>
        <Table
          :tableData="tableData"
          :tableColumn="tableColumn"
          :isLoading="tableLoading"
          @check="check"
          @copy="copy"
          @remove="remove"
        />
        <Pagenum
          :total="total"
          :currentPage="page"
          :pageSize="size"
          :layout="'total, prev, pager, next, jumper'"
          :small="true"
          @handleCurrentChange="handleCurrentChange"
        />
      </el-card>
    </el-form>
    <el-form
      ref="submitRef"
      size="small"
      :model="createForm"
      :rules="createRules"
      label-width="140px"
    >
      <el-card class="drawer-card">
        <template #header>
          <span>
            新增新闻图片
          </span>
        </template>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="新闻图片名称：" prop="imgName">
              <el-input
                class="input-common"
                v-model="createForm.imgName"
                placeholder="新闻图片名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="上传新闻图片：" prop="fileImg">
              <el-upload
                ref="uploadRef"
                action=""
                :auto-upload="false"
                list-type="picture"
                :limit="1"
                :on-change="onChange"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">
                  点击上传
                </el-button>
                <template #tip>
                  <div>
                    只能上传 jpg/png 文件，最多上传一张
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-button
              class="button-create"
              type="primary"
              size="small"
              :loading="isLoading"
              @click="submit"
            >
              提交
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { ElMessage } from 'element-plus';
import Table from './Table.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';

export default defineComponent({
  components: { Table, Pagenum },
  setup () {
    const state = reactive({
      searchForm: {
        year: undefined,
        month: undefined,
        page: 0,
        size: 5
      } as newsParams,
      createForm: {
        imgName: undefined
      } as newsParams,
      createRules: {
        imgName: [
          { required: true, message: '请输入图片名字', trigger: ['blur', 'change'] }
        ],
        fileImg: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileImg === undefined) {
              callback(new Error('请按规定上传图片'));
            } else {
              callback();
            }
          },
          trigger: ['change']
        }]
      },
      fileImg: undefined as any,
      submitRef: ref(),
      isLoading: false,
      openDrawer: false,
      tableData: [] as Array<any>,
      tableLoading: false,
      total: 0,
      page: 1,
      size: 5
    });
    const tableColumn = reactive([
      {
        prop: 'imgName',
        label: '图片名称',
        width: 'auto'
      }
    ]);

    const yearInput = (data: number) => {
      if (data > 2021) {
        state.searchForm.year = 2021;
      } else if (data < 1) {
        state.searchForm.year = 1;
      }
    };
    const monthInput = (data: number) => {
      if (data > 12) {
        state.searchForm.month = 12;
      } else if (data < 1) {
        state.searchForm.month = 1;
      }
    };
    const open = () => {
      state.openDrawer = true;
    };
    const close = () => {
      state.openDrawer = false;
    };
    const search = () => {
      state.tableLoading = true;
      newsHttp.searchImage(state.searchForm)
        .then((response: any) => {
          console.log(response);
          // state.total = response.totalElements;
          // state.size = response.size;
          // state.tableData = [];
          // for (let i = 0; i < response.content.length; i++) {
          //   state.tableData.push(response.content[i]);
          // }
        })
        .finally(() => {
          state.tableLoading = false;
        });
    };
    const submit = () => {
      state.submitRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          newsHttp.uploadNewsImage(state.createForm, state.fileImg.raw)
            .then((response: any) => {
              console.log(response);
            })
            .finally(() => {
              state.isLoading = false;
            });
        }
      });
    };
    const onChange = (file: any) => {
      state.fileImg = file;
      state.submitRef.validate();
    };
    const beforeRemove = () => {
      state.fileImg = undefined;
    };
    const sortChange = (params: any) => {
      if (params.prop === null) {
        state.searchForm.sort = '';
      } else {
        state.searchForm.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      search();
    };
    const check = (data: any) => {
      console.log(data);
    };
    const copy = (data: any) => {
      console.log(data);
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        newsHttp.deleteNewsImage(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            search();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const handleCurrentChange = (newPage: any) => {
      state.searchForm.page = newPage;
      state.page = newPage + 1;
      search();
    };

    return {
      ...toRefs(state),
      tableColumn,
      yearInput,
      monthInput,
      open,
      close,
      search,
      submit,
      onChange,
      beforeRemove,
      sortChange,
      check,
      copy,
      remove,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped>
.drawer-card {
  margin: 0px 2.5% 50px;
  width: 95%;
}
.input-common {
  width: 95%;
}
.button-create {
  float: right;
}
</style>
