<template>
    <div v-if="isOpen" ref="modal" class="modal">
        <div class="w-full h-full px-4 py-2">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const modal = ref();

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

const handleClickOutside = (event: MouseEvent) => {
    if (modal.value && !modal.value.contains(event.target)) {
        closeModal();
    }
};

function closeModal() {
    emits('update:isOpen', false);
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--background);
    z-index: 1000;

    border: 0.25rem solid var(--primary);
    border-radius: 20px;
    border-left: 0.6rem solid var(--primary);
}
</style>