<template>
	<SvgArrowBottom :color="color" class="rotate-180 transform" />
</template>

<script setup lang="ts">
const { color } = defineProps({ color: { type: String, default: 'var(--accent)' } });
</script>
