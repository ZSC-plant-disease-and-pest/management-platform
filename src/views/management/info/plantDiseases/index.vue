<template>
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    @check="check"
    @edit="edit"
    @remove="remove"
    @add="add"
  />
</template>

<script lang="ts">
import Table from '@/components/common/table/Table.vue';
import {
  defineComponent,
  reactive
} from 'vue';

export default defineComponent({
  props: {},
  components: { Table },
  setup () {
    const tableData = reactive([
      {
        id: '1',
        name: '紫纹羽病',
        symptom: '病原 helicobasidium inompa tanaka.jacz.异名：h.purpureum tul pat.称桑卷担菌和紫卷担菌，属担子菌亚门真菌。病根上着生的紫黑绒状物是菌丝层，由五层组成，外层为子实层，其上生有担子。担子圆筒状无色，由4个细胞组成，大小25-40×6-7微米，响一方弯曲。再从各胞伸出小梗，小梗无色，圆锥形，大小5-15×3-4.5微米。小梗上着担孢子，担孢子无色、单胞，卵圆形，顶端圆，基部尖，大小16-19×6-6.4微米，多在雨季形成。 ',
        description: '主要为害根系，细根先发病，后逐渐扩展到侧根和主根，直至树干基部。发病初期根部现黄褐色不定形斑块，外表颜色变深，皮层组织变褐，病部表面缠绕许多淡紫色棉絮状物，即病菌菌丝和菌素，形状似羽毛，逐渐变成暗紫色绒毛状菌丝层，包被整个病根，并能延伸到根外的土面上。后期在病根上产生紫红色半球状菌核，大小1-2毫米，病根皮层腐烂易脱落，后木质部腐朽，6-7月，菌丝体上产生微薄白粉状子实层，病株地上部生长衰弱，叶片变小，色淡，枝条节间缩短或部分枝条干枯，感病品种叶柄和中脉变红。该病扩展缓慢，经数年才逐渐衰弱死亡。',
        regularity: '以菌丝体、根状菌索和菌核在病根上或土壤中越冬。条件适宜，根状菌索和菌核产生菌丝体。菌丝体集结形成菌丝束，在土表或土里延伸，接触寄主根系后直接侵入为害。一般病菌先侵染新根的柔软组织，后蔓延到大根。病根与健根系互相接触是该病扩展、蔓延的重要途径。病菌虽能产生孢子但寿命短。萌发后侵染机会少，所以病菌孢子在病害传播中作用不大。病害发生盛期多在7-9月。低洼潮湿 积水的果园，发病重。带病刺槐是该病的主要传播媒介，靠近带病刺槐的苹果树易发病。 　',
        seasons: '7-9月',
        regions: '紫纹羽病一般在树龄较大的老果园发病重，主要为害苹果、梨、桃、葡萄等果树。'
      },
      {
        id: '2',
        name: '苹果轮纹病',
        symptom: '该菌与干腐病菌同属1个种，但它是专化型。其小黑点是病菌的子座。1个子座含1个分生孢子器或子囊腔室。分生孢子无色，单胞，长椭圆形。',
        description: '枝干发病，以皮孔为中心形成暗褐色、水渍状或小溃疡斑，稍隆起呈疣状，圆形。后失水凹陷，边缘开裂翘起，扁圆形，直径达1厘米左右，青灰色。多个病斑密集，形成主干大枝树皮粗糙，故称“粗皮病”。斑上有稀疏小黑点。果实受害初以果点为中心出现浅褐色的圆形斑，后变褐扩大，呈深浅相间的同心轮纹状病斑，其外缘有明显的淡色水渍圈，界线不清晰(病斑扩展引起果实腐烂。烂果有酸腐气味，有时渗出褐色粘液。',
        regularity: '此病菌与苹果干腐病菌相似。以菌丝体和分生孢子器在枝干病部组织中越冬。春季由分生孢子器产生分生孢子，涌出灰白色孢子角。春雨中分生孢子分散、传播到枝干伤口、皮孔和果实皮孔附近，产生芽管侵入树体，然后潜伏。带菌果并不发病，待近成熟期和贮存期分散、传播到枝干伤口、皮孔和果实皮孔附近，产生芽管侵入树体，然后潜伏。带菌果并不发病，待近成熟期和贮存期发病。品种抗病性有差异。富士、王林、千秋等品种高度感病。',
        seasons: '果实从幼果期至成熟期均可被侵染，但是以幼果期为主，采果前为发病盛期。',
        regions: '河北井陉，山东、辽宁、山西、北京、天津、河南、浙江、江苏、上海、江西、安徽、四川、云南、吉林；日本、朝鲜。'
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'seasons',
        label: '发病季节',
        width: 'auto'
      },
      {
        prop: 'regions',
        label: '分布地域',
        width: 'auto'
      }
    ]);
    const add = (data: any) => {
      console.log(data);
    };
    const remove = (data: any) => {
      console.log(data);
    };
    const edit = (data: any) => {
      console.log(data);
    };
    const check = (data: any) => {
      console.log(data);
    };
    return {
      tableData,
      tableColumn,
      add,
      remove,
      edit,
      check
    };
  }
});
</script>

<style lang="scss" scoped></style>
