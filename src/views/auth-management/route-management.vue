<!-- 路由管理 -->
<template>
<div>
  <a-tree
    class="draggable-tree"
    :defaultExpandedKeys="expandedKeys"
    draggable
    @dragenter="onDragEnter"
    @drop="onDrop"
    :treeData="gData"
  />
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
  <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
    <EditMenuItem key="item-1"/>
    <EditMenuSubitem key="subitem-1">
      <EditMenuItem key="item-2"/>
    </EditMenuSubitem>
  </EditMenu>
</div>
</template>

<script>
import { EditMenu, EditMenuSubitem, EditMenuItem } from '@business/edit-menu'
export default {
  data () {
    return {
      selectedKeys: [],
      openKeys: []
    }
  },
  name: 'RouteManagement',
  components: {
    EditMenu,
    EditMenuSubitem,
    EditMenuItem
  },
  methods: {
    handleOpenChange (keys) {
      console.log(keys)
      this.openKeys = keys
    },
    handleSelected (keys) {
      this.selectedKeys = keys
    }
  }
}
</script>
