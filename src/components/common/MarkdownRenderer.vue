<template>
  <vue-markdown v-highlight :source="content" class="markdown-body" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueMarkdown from './VueMarkdown.vue';

export default defineComponent({
  name: 'ApiCode',
  components: {
    VueMarkdown
  },
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {},
  watch: {}
});
</script>

<style lang="scss">
@import 'github-markdown-css/github-markdown.css';
</style>

<style lang="scss" scoped>
.markdown-body {
  background: none;
  padding-top: 3px;
  color: var(--el-text-color-primary);
  ol {
    list-style: initial;
  }
}
</style>
