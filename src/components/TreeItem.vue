<template>
  <li>
    <div @click="handleClick" class="name">
      <div class="level">{{ level }}</div>
      {{ data.name }}
    </div>
    <ul v-if="isOpen">
      <component-a
        v-for="item in data.children"
        :key="item.id"
        :data="item"
        :level="level + 1"
        @setFlag="setFlag"
        @setFolder="setFolder"
        :important="folderSelect == item.id ? true : null"
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
    };
  },
  watch: {
    selectedID() {
      if(this.data.id === this.selectedID) {
        this.$emit("setFolder", this.data.id);
        this.$emit("setFlag", true);
        console.log(321);
      } else {
        this.$emit("setFlag", null)
      }
    },
  },
  computed: {
    isFolder: function () {
      return this.data.children && this.data.children.length;
    },
    lineColor() {
      return this.level <= 1 ? "none" : "red";
    },
    selectedID() {
      return this.getSelectedID();
    },
  },
  created() {},
  mounted() {
    if(this.important) {
      this.isOpen = this.important
    }
    else this.isOpen = false
  },
  methods: {
    ...mapGetters(["getSelectedID"]),
    ...mapMutations(["SET_SELECTED_ID"]),
    handleClick: function () {
        this.isOpen = !this.isOpen;
        if(this.isOpen) {
          this.SET_SELECTED_ID(this.data.id)
        } else {
          this.$emit("setFolder", null)
          this.SET_SELECTED_ID(null)
        }
    },
    setFlag(value) {
      this.flag = value;
    },
    setFolder(id) {
      this.folderSelect = id;
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
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
  border-left: 1px solid #acacac;
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
  width: 7px;
  height: 1px;
  background: v-bind(lineColor);
}
.level {
  height: 17px !important;
  width: 17px !important;
  /* padding: 20px; */
  background: rgb(41, 142, 209);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
}
</style>
>
