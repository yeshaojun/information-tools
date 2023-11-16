<template>
  <el-menu
    class="el-menu-vertical-demo"
    active-text-color="#fae361"
    text-color="#fff"
    background-color="#4d698e"
    default-active="/"
    router
  >
    <el-menu-item index="/">
      <template #title>
        <el-icon><Aim /></el-icon>
        资讯
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>工具</span>
      </template>
      <el-menu-item index="house">
        <template #title>
          <el-icon><HomeFilled /></el-icon>
          房贷计算
        </template>
      </el-menu-item>
      <el-menu-item index="money">
        <template #title>
          <el-icon><Money /></el-icon>
          理财计算
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import { Tools, Aim, HomeFilled, Money } from "@element-plus/icons-vue";
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
