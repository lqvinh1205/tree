<template>
  <li :class="{ tree: !levelDefault  }">
    <div
      @click="handleClick"
      class="tree__name"
      :class="{ 'tree--active': selectedID == this.data.id }"
    >
      <div
        class="tree__name__is-folder"
        v-if="!isFolder | !levelDefault"
      ></div>
      <div class="tree__name__level">{{ level }}</div>
      {{ data.name }}
    </div>
    <ul v-show="isOpen" class="tree__ul">
      <tree-item
        v-for="item in data.children"
        :key="item.id"
        :data="item"
        :level="level + 1"
        @setFolder="setFolder"
      />
    </ul>
  </li>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "tree-item",
  components: {
    "tree-item": this,
  },
  props: ["data", "level", "important"],

  data() {
    return {
      isOpen: false,
      folderSelect: null,
    };
  },
  watch: {
    selectedID() {
      if (this.data.id === this.selectedID) {
        this.$emit("setFolder", this.data.id);
      } else {
        this.$emit("setFolder", null);
      }
    },
    folderSelect() {
      if (this.folderSelect != null) {
        this.$emit("setFolder", this.data.id);
      }
    },
  },
  computed: {
    levelDefault() {
      // xac level 1 de disable class css
      return this.level === 1
    },
    isFolder: function () {
      return this.data.children && this.data.children.length;
    },
    lineColor() {
      return this.level <= 1 ? "none" : "#e1e1e1";
    },
    selectedID() {
      return this.getSelectedID();
    },
  },
  mounted() {},
  methods: {
    ...mapGetters(["getSelectedID"]),
    ...mapMutations(["SET_SELECTED_ID"]),
    handleClick: function () {
      this.isOpen = !this.isOpen;
      this.$emit("setFolder", this.data.id);
      if (!this.isFolder) {
        this.SET_SELECTED_ID(this.data.id);
      }
    },
    setFolder(id) {
      this.folderSelect = id;
    },
  },
};
</script>
<style lang="scss" scoped>
.tree {
  padding: 2px 0;
  padding-left: 10px;
  line-height: 1.5em;
  position: relative;
  border-left: 1px solid #e1e1e1;
  &__name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      left: -10px;
      width: 8px;
      height: 0px;
      border: 0.1px solid v-bind(lineColor);
    }
    &:hover {
      cursor: pointer;
    }
    &__is-folder {
      border-left: 8px solid transparent;
      border-bottom: 8px solid rgb(131, 131, 131);
      display: flex;
      align-items: center;
      z-index: 99;
      position: absolute;
      left: -15px;
    }
    &__level {
      height: 17px !important;
      width: 17px !important;
      background: #4a6680;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-size: 12px;
    }
  }
  &__ul {
    margin: 0;
    padding: 0;
    list-style: none;
    padding-left: 8px;
  }
  .tree--active {
    color: #4a6680;
  }
}
</style>
