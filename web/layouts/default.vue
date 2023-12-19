<template>
    <header></header>

    <!-- LAYOUT DESKTOP -->
    <main class="flex-1 flex h-screen" v-if="layout === 'desktop'">
        <nav class="p-2 h-full">
            <ul class="flex flex-col items-center gap-4 h-full">
                <template v-for="(item, index) in useLeftNavBar">
                    <li v-if="!index" class="flex-1 flex justify-start">
                        <NuxtLink :to="item.to">
                            <component
                                :is="item.svg"
                                class="rounded-xl w-16 h-16"
                                :class="{
                                    'bg-accent-15':
                                        router.path.startsWith(item.to) && index
                                }"
                            />
                        </NuxtLink>
                    </li>
                    <li v-else class="w-14 h-14">
                        <NuxtLink :to="item.to">
                            <component
                                :is="item.svg"
                                class="rounded-xl w-full h-full"
                                :class="{
                                    'bg-accent-15':
                                        router.path.startsWith(item.to) && index
                                }"
                            />
                        </NuxtLink>
                    </li>
                </template>
                <li class="flex-1"></li>
            </ul>
        </nav>
        <div class="w-0.5 h-full bg-gray-200"></div>
        <div class="h-screen w-full flex-col">
            <nav class="w-full h-[70px] p-2">
                <ul class="w-full h-full items-center flex justify-end gap-4">
                    <li class="mr-auto">
                        <h1>{{ title }}</h1>
                    </li>
                    <li class="self-start">
                        <SvgSettings class="w-8 h-8" color="var(--primary)" />
                    </li>
                    <li class="self-start">
                        <SvgNotification
                            class="w-8 h-8"
                            color="var(--primary)"
                        />
                    </li>

                    <li class="self-start">
                        <SvgAccount class="w-8 h-8" color="var(--primary)" />
                    </li>
                </ul>
            </nav>
            <div class="h-[calc(100%-70px)] w-full pl-6 pr-0.5 pt-1">
                <slot />
            </div>
        </div>
    </main>
    <!-- !LAYOUT DESKTOP -->

    <!-- LAYOUT MOBILE -->
    <main v-else-if="layout" class="flex-1 flex flex-col h-screen px-4">
        <div class="flex-1 w-full flex-col">
            <nav class="w-full pt-2">
                <ul class="w-full h-full items-center flex justify-end gap-4">
                    <li class="mr-auto">
                        <h2>{{ title }}</h2>
                    </li>
                    <!-- <li class="">
                        <SvgSettings class="w-8 h-8" color="var(--primary)" />
                    </li>
                    <li class="">
                        <SvgNotification
                            class="w-8 h-8"
                            color="var(--primary)"
                        />
                    </li>

                    <li class="">
                        <SvgAccount class="w-8 h-8" color="var(--primary)" />
                    </li> -->
                </ul>
            </nav>
            <div class="h-[calc(100vh-9rem)] w-full pt-2" >
                <slot />
            </div>
        </div>
        <nav class="h-[5rem] w-full flex-center">
            <ul
                class="p-2 flex-center gap-4 w-[calc(100%)] h-full card !rounded-b-[0]"
            >
                <template v-for="(item, index) in useLeftNavBar">
                    <li v-if="!index" class="flex-1 flex justify-start">
                        <NuxtLink :to="item.to">
                            <component
                                :is="item.svg"
                                class="rounded-xl w-16 h-16"
                                :class="{
                                    'bg-accent-15':
                                        router.path.startsWith(item.to) && index
                                }"
                            />
                        </NuxtLink>
                    </li>
                    <li v-else class="w-14 h-14">
                        <NuxtLink :to="item.to">
                            <component
                                :is="item.svg"
                                class="rounded-xl w-full h-full"
                                :class="{
                                    'bg-accent-15':
                                        router.path.startsWith(item.to) && index
                                }"
                            />
                        </NuxtLink>
                    </li>
                </template>
                <li class="flex-1"></li>
            </ul>
        </nav>
    </main>
    <!-- !LAYOUT MOBILE -->

    <main v-else>
        <UiLoaderAbsolute class="h-14" />
    </main>
</template>

<script lang="ts" setup>
import { useScreenStore } from '~/store/screen';

const router = useRoute();

const title = computed(() => {
    const path = router.path;
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/articles')) return 'Articles';
    if (path.startsWith('/explore')) return 'Explore';
    return 'Count of Money';
});

const screenStore = useScreenStore();
const { layout } = storeToRefs(screenStore);

onMounted(() => {
    screenStore.update();
    window.addEventListener('resize', screenStore.update);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', screenStore.update);
});
</script>

<style lang="scss" scoped></style>
