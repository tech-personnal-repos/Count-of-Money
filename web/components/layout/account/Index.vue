<template>
    <VDropdown
        :triggers="[]"
        :shown="isOpen"
        :autoHide="false"
        placement="bottom-start"
        :distance="2"
        @click="isOpen = !isOpen"
        ref="dropdown"
    >
        <div class="flex items-center gap-2 mr-4 cursor-pointer">
            <template v-if="loaded">
                <SvgAccount
                    v-if="!isAvatarValid"
                    class="w-10 h-10"
                    color="var(--primary)"
                />
                <div
                    v-else
                    class="outline outline-primary rounded-full -outline-offset-2"
                >
                    <img
                        v-if="user"
                        :src="user.avatarUrl"
                        alt="avatar"
                        class="w-10 h-10 max-sm:w-6 max-sm:h-6 rounded-full"
                    />
                </div>
                <h5 v-if="!user">Sign In</h5>
                <h5 v-else-if="layout !== 'mobile' && user">
                    {{ user.displayName }}
                </h5>
                <SvgArrowBottom :class="isOpen ? 'transform rotate-180' : ''" />
            </template>
            <template v-else>
                <div class="flex-center w-20">
                    <UiLoader />
                </div>
            </template>
        </div>
        <template #popper>
            <div ref="content">
                <LayoutAccountDisconnected
                    v-if="!user"
                    @connected="handleConnect"
                />
                <LayoutAccountConnected v-else @disconnect="user = null" />
            </div>
        </template>
    </VDropdown>
</template>

<script lang="ts" setup>
import { useScreenStore } from '~/store/screen';
import { useUserStore } from '~/store/user';

const loaded = ref(false);

const isAvatarValid = ref(false);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
useMountedFetch(async () => {
    if (!user.value) await userStore.fetchUser();
    loaded.value = true;
});

function handleConnect() {
    userStore.fetchUser();
}

watch(user, async () => {
    if (!user.value || !user.value.avatarUrl)
        return (isAvatarValid.value = false);
    isAvatarValid.value = await verifyUrlImage(user.value.avatarUrl);
});

const screenStore = useScreenStore();
const { layout } = storeToRefs(screenStore);

const isOpen = ref(false);
const dropdown = ref();
const content = ref();

async function verifyUrlImage(url: string) {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.startsWith('image/')) {
        return true;
    }
    return false;
}

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

function handleClickOutside(event: MouseEvent) {
    if (content.value && !content.value.contains(event.target)) {
        closeModal();
    }
}

function closeModal() {
    isOpen.value = false;
}
</script>

<style lang="scss" scoped></style>
