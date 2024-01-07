export const useLeftNavBar: {
    title: string;
    to: string;
    svg: any;
}[] = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        svg: defineAsyncComponent(() => import('@/components/svg/Icon.vue'))
    },
    {
        title: 'Dashboard',
        to: '/dashboard',
        svg: defineAsyncComponent(
            () => import('@/components/svg/Dashboard.vue')
        )
    },
    {
        title: 'Articles',
        to: '/articles',
        svg: defineAsyncComponent(() => import('@/components/svg/Article.vue'))
    },
    {
        title: 'Explore',
        to: '/explore',
        svg: defineAsyncComponent(() => import('@/components/svg/Explore.vue'))
    }
];
