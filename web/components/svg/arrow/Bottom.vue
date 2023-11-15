<template>
	<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1L6 6L11 1" :stroke="color" stroke-width="2" stroke-linecap="round" />
	</svg>
</template>

<script setup lang="ts">
const { color } = defineProps({ color: { type: String, default: 'var(--accent)' } });
</script>
