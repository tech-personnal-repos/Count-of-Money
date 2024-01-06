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
        <div class="flex items-center gap-2 mr-4">
            <SvgAccount
                v-if="!user || !user.avatarUrl"
                class="w-10 h-10"
                color="var(--primary)"
            />
            <div
                v-else
                class="outline outline-primary rounded-full -outline-offset-2"
            >
                <img
                    :src="user.avatarUrl"
                    alt="avatar"
                    class="w-10 h-10 max-sm:w-6 max-sm:h-6 rounded-full"
                />
            </div>
            <h5 v-if="!user">Sign In</h5>
            <h5 v-else-if="layout !== 'mobile'">{{ user.displayName }}</h5>
            <SvgArrowBottom :class="isOpen ? 'transform rotate-180' : ''" />
        </div>
        <template #popper>
            <LayoutAccountDisconnected
                v-if="!user"
                @connected="userStore.fetchUser()"
            />
            <LayoutAccountConnected v-else @disconnect="user = null" />
        </template>
    </VDropdown>
</template>

<script lang="ts" setup>
import { useScreenStore } from '~/store/screen';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
useMountedFetch(() => {
    console.log('fetching user');
    if (!user.value) userStore.fetchUser();
});

const screenStore = useScreenStore();
const { layout } = storeToRefs(screenStore);

const isOpen = ref(false);
const dropdown = ref();

useClickOutside(dropdown, () => {
    isOpen.value = false;
});
</script>

<style lang="scss" scoped></style>
