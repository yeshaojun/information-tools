<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="定投计算" name="investment">
      <div class="content">
        <el-form label-width="120px" ref="formRef" :model="form">
          <el-form-item
            label="每月定投金额"
            prop="account"
            :rules="[
              { required: true, message: '请先输入金额' },
              { type: 'number', message: '请输入正确的格式' },
            ]"
          >
            <el-input v-model.number="form.account">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="定投年限"
            prop="year"
            :rules="[
              { required: true, message: '请先输入年限' },
              { type: 'number', message: '请输入正确的格式' },
            ]"
          >
            <el-input v-model.number="form.year">
              <template #append>年</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="预期年化收益"
            prop="rate"
            :rules="[
              { required: true, message: '请先输入年化收益' },
              { type: 'number', message: '请输入正确的格式' },
            ]"
          >
            <el-input v-model.number="form.rate">
              <template #append>%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="calc">计算</el-button>
            <el-button @click="reset">清空</el-button>
          </el-form-item>
        </el-form>
        <el-card class="box-card" v-if="result.principal">
          <template #header>
            <div class="card-header">定投收益如下</div>
          </template>
          <div class="mb-2">
            <span class="tip-text">总收益：</span>
            <el-text class="mx-1 font-bold" type="primary"
              >{{ result.principal }}元</el-text
            >
          </div>
          <div class="mb-2">
            <span class="tip-text">收益：</span>
            <el-text class="mx-1 font-bold" type="primary"
              >{{ result.returns }}元</el-text
            >
          </div>
          <div>
            <span class="tip-text">本金：</span>
            <el-text class="mx-1 font-bold" type="primary"
              >{{ result.principal - result.returns }}元</el-text
            >
          </div>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="收益计算" name="income">
      <el-form>
        <el-form-item label="历年收益">
          <el-input
            v-model="incomeValue"
            placeholder="收益请用英文逗号分隔"
          ></el-input>
          <p class="font-des">
            例如第一年收益100%，第二年收益-50%：则可以输入100，-50。此时收益为0，算术均值收益为25%，几何均值为0%。
          </p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="calcIncome">计算</el-button>
        </el-form-item>
      </el-form>
      <div v-if="incomeResult || avgResult">
        <div class="mb-2">
          <span class="tip-text">几何均值：</span>
          <el-text class="mx-1 font-bold" type="primary"
            >{{ incomeResult }}%</el-text
          >
        </div>
        <div class="mb-2">
          <span class="tip-text">算术均值：</span>
          <el-text class="mx-1 font-bold" type="primary"
            >{{ avgResult }}%</el-text
          >
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import {
  calculateInvestmentReturns,
  calculateGeometricMean,
} from "@/utils/formula";
const activeName = ref("investment");
const form = reactive({
  account: "",
  year: "",
  rate: "",
});
const formRef = ref<FormInstance>();
const result = ref<any>({
  principal: "",
  returns: "",
  year: 0,
});
const incomeValue = ref("");
const incomeResult = ref(0);
const avgResult = ref(0);
function calc() {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      result.value = calculateInvestmentReturns(
        Number(form.year),
        Number(form.rate),
        Number(form.account),
      );
      console.log("111", result.value);
    } else {
      console.log("error submit!");
      return false;
    }
  });
}

function reset() {
  form.account = "";
  form.year = "";
  form.rate = "";
}

function calcIncome() {
  const list = incomeValue.value.split(",");
  console.log("list", list);
  if (
    list.every(
      (item: string) => typeof item === "string" && !isNaN(Number(item)),
    )
  ) {
    const arr = list.map((_) => Number(_));
    avgResult.value = arr.reduce((t, v) => t + v, 0) / arr.length;
    incomeResult.value = calculateGeometricMean(arr) || 0;
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 400px;
}

.tip-text {
  display: inline-block;
  width: 80px;
}
.font-des {
  color: #999;
}
</style>
