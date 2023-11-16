<script setup lang="ts">
import MenuCom from "./components/menu/index.vue";
</script>
<template>
  <el-container>
    <el-aside style="height: 100vh">
      <menu-com></menu-com>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
