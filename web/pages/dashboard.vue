<template>
    <Head>
        <Title>Dashboard - Count of Money</Title>
    </Head>

    <div class="w-full h-full flex gap-2">
        <div class="flex flex-col flex-1 gap-4">
            <DashboardSelectedCoinsVariations class="flex-1" />
            <DashboardFollowedArticleList class="h-2/5 w-full" />
        </div>
        <div class="w-[22rem]">
            <DashboardFollowedCoinList class="h-full w-full p-3" />
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
