<script setup lang="ts"></script>
<template>
  <h1 class="text-3xl font-bold underline">this is vue template</h1>
  <el-button>我是 ElButton</el-button>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
