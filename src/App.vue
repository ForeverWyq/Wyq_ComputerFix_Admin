<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style type="text/css">
	#app{
		overflow: hidden;
	}
	/* 内容区边框颜色 */
	#app .main-container:nth-child(2){
		background-color: #fff;
	}
	/* 内容区颜色 */
	.app-main{
		background-color: #fff;
	}
	/* logo颜色 */
	.sidebar-logo-container[data-v-6494804b]{
		background-color: rgb(150, 150, 150) !important;
		/* border-bottom: 1px solid #ddd; */
		
	}
	.sidebar-logo-container .sidebar-logo-link .sidebar-title[data-v-6494804b] {
		/* color: #303133 !important; */
		color: #fff !important;
	}
	#app .sidebar-container {
		border-right: 1px solid #ddd;
	}
</style>