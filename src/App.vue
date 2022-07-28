<template>
  <div id="app">
    <TreeItem :data="treeData" :level="1"/>
  </div>
</template>

<script>
import TreeItem from "./components/TreeItem.vue";
export default {
  components: {
    TreeItem,
  },
  data() {
    return {
      currentItem: null,
      treeData: {
        name: "My Tree",
        id: "lv1001",
        children: [
          { name: "hello", id: "lv2001" },
          { name: "wat", id: "lv2002" },
          {
            name: "child folder",
            id: "lv2003",
            children: [
              {
                name: "child folder",
                id: "lv3001",
                children: [
                  { name: "hello", id: "lv4001" },
                  { name: "wat", id: "lv4002" },
                ],
              },
              { name: "hello", id: "lv3002" },
              { name: "wat", id: "lv3003" },
              {
                name: "child folder",
                id: "lv3004",
                children: [
                  { name: "hello", id: "lv4003" },
                  { name: "wat", id: "lv4004" },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    setSelectedID(id) {
      this.selectedID = id;
    },
    onSelect: function (uuid) {
      if (this.currentItem === uuid) {
        this.currentItem = null;
      } else {
        this.currentItem = uuid;
      }
      console.log(this.currentItem);
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
</style>
