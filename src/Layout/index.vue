<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="220px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          router unique-opened>
          <template v-for="(item, _index) in routerList[1].children" :key="item.name">
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
              <el-icon>
                <component :is="item.meta?.icon" />
              </el-icon>
              <span>{{ item?.meta?.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <breadCrumb />
          <div class="user" @click="show = !show">
            <div class="block">
              <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <p>{{ info?.username }}</p>
            </div>
            <div class="info">
              <el-icon v-if="show" size="15"><ArrowDownBold /></el-icon>
              <el-icon v-else size="15"><ArrowUpBold /></el-icon>
            </div>
          </div>
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/breadCrumb/index.vue'
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const routerList = reactive(useRouter().options.routes)
const route = reactive(useRoute())
const defaultActive = ref(route.fullPath)
const info: any = ref(JSON.parse(localStorage.getItem('info')))
const show:boolean = ref(true)
watch(route, (newValue => {
  defaultActive.value = newValue.fullPath
}))
const handleOpen = (key: string, _keyPath: string[]) => {
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

    .el-header {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      justify-content: space-between;

      .user {
        display: flex;
        align-items: center;
        font-size: 10px;

        .block {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .info {
          cursor: pointer;
          margin-left: 8px;
        }
      }
    }
  }

  .el-aside {
    height: 100%;

    .el-menu-vertical-demo {
      // width: 180px;
      height: 100%;
    }

    .el-menu {
      height: 100%;
    }
  }
}</style>