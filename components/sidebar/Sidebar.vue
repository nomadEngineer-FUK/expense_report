<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useIsUnderBreakpoint } from '~/composables/api/supabase/common/useCommon';
import { navLinks } from '~/composables/sidebar/useSidebar';

// 端末の判定
const isMobile = useIsUnderBreakpoint(768);
const isSidebarOpen = ref(false);

// ルート変更時にサイドバーを閉じる（モバイルのみ）
const route = useRoute()

watch(
    () => route.fullPath,
    () => {
        if (isMobile.value) {
            isSidebarOpen.value = false
        }
    }
)
</script>

<template>
    <div>
        <!-- ハンバーガーメニュー（モバイル表示のみ） -->
        <button
            class="hamburger"
            @click="isSidebarOpen = !isSidebarOpen"
        >
            ☰
        </button>

        <!-- サイドバー -->
        <div :class="['sidebar', { open: isSidebarOpen }]">
            <div class="sidebar-header">
                <NuxtLink
                    to="/"
                    class="header-link"
                    >経費精算</NuxtLink
                >
            </div>
            <nav class="sidebar-nav">
                <ul class="nav-list">
                    <li
                        v-for="link in navLinks"
                        :key="link.path"
                        class="nav-item"
                    >
                        <NuxtLink
                            :to="link.path"
                            :class="[
                                'nav-link',
                                route.path === link.path ? 'active' : ''
                            ]"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
/* サイドバー：デフォルト（PC） */
.sidebar {
    width: 12%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    background-color: #1a2a42;
    z-index: 149;
    transition: transform 0.3s ease;
}
.sidebar-header {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
}
.header-link {
    text-decoration: none;
    font-size: large;
    color: #ededed;
}

.sidebar-nav {
    margin-top: 1.8rem;
    text-align: center;
}
.nav-list {
    list-style: none;
    padding: 0;
}
.nav-item {
    padding: 1.6rem 0;
    height: 100%;
    position: relative;
}
.nav-item:hover {
    background-color: #2b3a56;
    transform: translateX(4px);
    border-radius: 0.4rem;
}
.nav-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ededed;
    font-weight: bold;
}

.active {
    background-color: #2c3e50;
    color: white;
    border-radius: 0.4rem;
    font-weight: bold;
}

/* モバイル用：ハンバーガー */
.hamburger {
    display: none;
}

/* モバイル表示 */
@media (max-width: 768px) {
    .sidebar {
        width: 70%;
        transform: translateX(-100%);
    }
    .sidebar.open {
        transform: translateX(0);
    }

    .hamburger {
        display: block;
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 150;
        background-color: #1a2a42;
        color: white;
        font-size: 1.5rem;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
    }
}
</style>
