<template>
  <li class="item">
    <div
      @click="handleClick"
      class="name"
      :class="{ active: selectedID == this.data.id }"
    >
      <div v-show="level != 1" class="is-folder"></div>
      <div class="level">{{ level }}</div>
      {{ data.name }}
    </div>
    <ul
      v-show="flag | (isOpen && important == null)"
      :class="{ folder: isFolder }"
    >
      <component-a
        v-for="item in data.children"
        :key="item.id"
        :data="item"
        :level="level + 1"
        @setFolder="setFolder"
        :important="folderSelect === item.id ? true : flag"
      />
    </ul>
  </li>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "component-a",
  components: {
    "component-a": this,
  },
  props: ["data", "level", "important"],

  data() {
    return {
      isOpen: false,
      folderSelect: null,
      flag: null,
    };
  },
  watch: {
    selectedID() {
      if (this.data.id === this.selectedID) {
        this.$emit("setFolder", this.data.id);
      } else {
        this.$emit("setFolder", 1);
      }
    },
    folderSelect() {
      if (this.folderSelect != 1) {
        this.$emit("setFolder", this.data.id);
      }
    },
    important() {
      this.flag = this.important;
    },
  },
  computed: {
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
  mounted() {
    // if (this.important) {
    //   this.isOpen = this.important;
    // } else this.isOpen = false;
  },
  methods: {
    ...mapGetters(["getSelectedID"]),
    ...mapMutations(["SET_SELECTED_ID"]),
    handleClick: function () {
      this.isOpen = !this.isOpen;
      this.$emit("setFolder", this.data.id);
      if (this.isOpen) {
        this.flag = this.important;
      }
      if (!this.isFolder) {
        this.SET_SELECTED_ID(this.data.id);
      }
      if (this.isFolder && !this.isOpen) {
        this.flag = false;
      }
    },
    setFolder(id) {
      this.folderSelect = id;
    },
    // makeFolder: function () {
    //   if (!this.isFolder) {
    //     this.$emit("make-folder", this.item);
    //     this.isOpen = true;
    //   }
    // },
  },
};
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 8px;
}
ul li {
  padding: 0;
  padding-left: 10px;

  line-height: 1.5em;
  position: relative;
  border-left: 1px solid #e1e1e1;
}
.name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  position: relative;
}
.name::before {
  position: absolute;
  content: "";
  left: -10px;
  width: 8px;
  height: 0px;
  border: 0.1px solid v-bind(lineColor);
}
.level {
  height: 17px !important;
  width: 17px !important;
  /* padding: 20px; */
  background: rgb(16, 52, 76);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
}
.active {
  text-decoration: underline;
  color: red;
}
.folder {
  /* padding-bottom: 10px; */
}
.is-folder {
  border-left: 8px solid transparent;
  border-bottom: 8px solid rgb(131, 131, 131);
  display: flex;
  align-items: center;
  z-index: 99;
  position: absolute;
  left: -15px;
}
</style>
>
