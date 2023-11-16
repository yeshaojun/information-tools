<template>
  <div class="content">
    <el-form label-width="120px" ref="formRef" :model="form">
      <el-form-item
        label="贷款金额"
        prop="account"
        :rules="[
          { required: true, message: '请先输入金额' },
          { type: 'number', message: '请输入正确的格式' },
        ]"
      >
        <el-input v-model.number="form.account">
          <template #append>万</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="贷款年限"
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
        label="贷款利率"
        prop="rate"
        :rules="[
          { required: true, message: '请先输入利率' },
          { type: 'number', message: '请输入正确的格式' },
        ]"
      >
        <el-input v-model.number="form.rate" />
      </el-form-item>
      <el-form-item label="贷款方式">
        <el-select v-model="form.way" style="width: 100%">
          <el-option value="等额本息" label="等额本息"></el-option>
          <el-option value="等额本金" label="等额本金"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="calc">计算</el-button>
        <el-button @click="reset">清空</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" v-if="result.totalInterest">
      <template #header>
        <div class="card-header">
          <span
            >[贷款{{ result.principal / 10000 }}万][利率{{
              result.annualRate
            }}][贷款{{ result.loanTerm }}年]</span
          >
        </div>
      </template>
      <div class="mb-2">
        <span class="tip-text"
          >{{ form.way === "等额本息" ? "每月" : "首月" }}需还款：</span
        >
        <el-text class="mx-1 font-bold" type="primary"
          >{{ result.firstMonthPayment }}元</el-text
        >
      </div>
      <div>
        <span class="tip-text">贷款总利息为：</span>
        <el-text class="mx-1 font-bold" type="primary"
          >{{ result.totalInterest }}元</el-text
        >
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { calculateMortgage, type MortgageType } from "@/utils/formula";
import type { FormInstance } from "element-plus";
const form = reactive({
  account: "",
  year: 20,
  rate: 4.2,
  way: "等额本息",
});
const formRef = ref<FormInstance>();
const result = ref<MortgageType>({
  firstMonthPayment: "",
  totalInterest: "",
});

function calc() {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      result.value = calculateMortgage(
        Number(form.account) * 10000,
        form.year,
        form.rate,
        form.way,
      );
    } else {
      console.log("error submit!");
      return false;
    }
  });
}

function reset() {
  form.account = "";
  form.year = 0;
  form.rate = 0;
  result.value = {
    firstMonthPayment: "",
    totalInterest: "",
  };
}
</script>
<style lang="scss" scoped>
.content {
  width: 400px;
}

.tip-text {
  display: inline-block;
  width: 120px;
}
</style>
