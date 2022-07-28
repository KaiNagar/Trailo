<template>
  <section class="style-menu">
    <div class="style-menu-header">
      <span @click="$emit('backToMenu')" class="back-icon"></span>
      <h3>Change background</h3>
      <span @click="$emit('closeMoreMenu')" class="close-icon"></span>
    </div>
    <hr>
    <div class="preview-menus flex space-between">
      <div @click="$emit('openImgsMenu')" class="imgs">
        <div class="imgs-preview"></div>
        <h3>Photos</h3>
      </div>
      <div @click="$emit('openColorsMenu')" class="colors">
        <div class="colors-preview"></div>
        <h3>Colors</h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
