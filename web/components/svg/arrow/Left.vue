<template>
	<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7 1L2 5.5L7 10" :stroke="color" stroke-width="1.5" />
	</svg>
</template>

<script setup lang="ts">
const { color } = defineProps({ color: { type: String, default: 'var(--accent)' } });
</script>
