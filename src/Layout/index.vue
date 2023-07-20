<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="260px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router unique-opened	>
          <template v-for="(item, index) in routerList[1].children" :key="index">
            <el-sub-menu :index="item.path" v-if="item.children">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>{{ item?.meta?.title }}</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item :index="item.path" v-else :route="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ item?.meta?.title }}</span>
            </el-menu-item>
          </template>

          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const routerList = reactive(useRouter().options.routes)
const defaultActive = ref('/home')
const handleOpen = (key: string, keyPath: string[]) => {
  defaultActive.value = key
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  background-color: $bg_color;
  .el-container {
    height: 100vh;
  }

  .el-aside {
    height: 100%;
    .el-menu-vertical-demo {
      height: 100%;
    }
    .el-menu {
      height: 100%;
    }
  }
}
</style>